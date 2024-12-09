import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dealersData from './data/updated_dealers.json';
import { Dealer } from './types';

// Leaflet ikon tanımlaması
const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Türkçe karakter normalizasyonu
const normalizeText = (text: string): string => {
  return text
    .toUpperCase()
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ş/g, 'S')
    .replace(/I/g, 'I')
    .replace(/İ/g, 'I')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C');
};

// Harita merkezi ayarlama komponenti
function MapController({ dealers }: { dealers: Dealer[] }) {
  const map = useMap();

  useEffect(() => {
    if (dealers.length > 0) {
      const bounds = L.latLngBounds(dealers.map(dealer => [dealer.latitude, dealer.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Türkiye'nin genel görünümü
      map.setView([39.0, 35.0], 6);
    }
  }, [dealers, map]);

  return null;
}

// Styled components tanımlamaları
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
`;

const Header = styled.header`
  background: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  flex: 1;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3,102,214,0.3);
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatsContainer = styled.div`
  background: #fff;
  padding: 1rem;
  margin: 0 1rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-around;
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    margin: 0;
    color: #0366d6;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0.5rem 0 0;
    color: #586069;
  }
`;

const PopupContent = styled.div`
  h3 {
    margin: 0 0 8px 0;
    color: #24292e;
    font-size: 1.1rem;
  }
  
  p {
    margin: 4px 0;
    color: #586069;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>(dealersData.dealers);

  // Gelişmiş arama fonksiyonu
  useEffect(() => {
    const term = normalizeText(searchTerm.trim());
    
    if (!term) {
      setFilteredDealers(dealersData.dealers);
      return;
    }

    // Önce şehir araması yap
    const cityDealers = dealersData.dealers.filter(dealer => 
      normalizeText(dealer.city).includes(term)
    );

    // Eğer şehir araması sonuç vermezse, ilçe ve bayi adı araması yap
    if (cityDealers.length === 0) {
      const otherDealers = dealersData.dealers.filter(dealer => {
        const normalizedDistrict = normalizeText(dealer.district);
        const normalizedName = normalizeText(dealer.name);
        return normalizedDistrict.includes(term) || normalizedName.includes(term);
      });
      setFilteredDealers(otherDealers);
    } else {
      // Şehir araması sonuç verdiyse, o şehirdeki tüm bayileri göster
      setFilteredDealers(cityDealers);
    }
  }, [searchTerm]);

  // Türkiye sınırları
  const bounds: L.LatLngBoundsExpression = [
    [35.8, 25.9], // Güneybatı köşesi
    [42.1, 44.6]  // Kuzeydoğu köşesi
  ];

  return (
    <AppContainer>
      <Header>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Şehir, ilçe veya bayi adı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <StatsContainer>
        <StatItem>
          <h3>{dealersData.dealers.length}</h3>
          <p>Toplam Bayi</p>
        </StatItem>
        <StatItem>
          <h3>{dealersData.cities.length}</h3>
          <p>Şehir</p>
        </StatItem>
        <StatItem>
          <h3>{filteredDealers.length}</h3>
          <p>Gösterilen Bayi</p>
        </StatItem>
      </StatsContainer>
      
      <MapWrapper>
        <MapContainer
          bounds={bounds}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          minZoom={6}
          maxZoom={13}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapController dealers={filteredDealers} />
          {filteredDealers.map((dealer, index) => (
            <Marker
              key={index}
              position={[dealer.latitude, dealer.longitude]}
              icon={customIcon}
            >
              <Popup>
                <PopupContent>
                  <h3>{dealer.name}</h3>
                  <p>Şehir: {dealer.city}</p>
                  <p>İlçe: {dealer.district}</p>
                </PopupContent>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </AppContainer>
  );
}

export default App;

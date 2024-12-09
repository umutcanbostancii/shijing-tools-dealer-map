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
  shadowSize: [41, 41],
  className: 'custom-marker'
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
      map.setView([39.0, 35.0], 6);
    }
  }, [dealers, map]);

  return null;
}

// Styled components tanımlamaları
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
`;

const MainHeader = styled.header`
  background: #c00023;
  padding: 0 1rem;
  height: 80px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    height: 60px;
    padding: 0 0.5rem;
  }
`;

const BoraLogo = styled.div`
  img {
    height: 80px;
    object-fit: contain;
  }

  @media (max-width: 1000px) {
    img {
      height: 50px;
    }
  }
`;

const ShijingLogo = styled.div`
  img {
    height: 60px;
    object-fit: contain;
  }

  @media (max-width: 1000px) {
    img {
      height: 40px;
    }
  }
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 1.3rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 1rem 0;
  }
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  @media (max-width: 1000px) {
    padding: 1rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;

  @media (max-width: 1000px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const SearchInput = styled.input`
  padding: 1rem 1.5rem;
  border: 2px solid #eee;
  border-radius: 8px;
  flex: 1;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #c00023;
    box-shadow: 0 0 0 3px rgba(192,0,35,0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 1000px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);

  @media (max-width: 1000px) {
    height: 400px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1000px) {
    gap: 0.5rem;
    margin: 0 0.5rem 1rem 0.5rem;
  }
`;

const StatItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  min-width: 0;

  h3 {
    color: #c00023;
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #666;
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.5rem;
  }

  @media (max-width: 1000px) {
    padding: 0.75rem 0.5rem;

    h3 {
      font-size: 1.5rem;
      margin: 0 0 0.25rem 0;
    }

    p {
      font-size: 0.75rem;
      padding: 0 0.25rem;
    }
  }
`;

const PopupContent = styled.div`
  h3 {
    margin: 0 0 8px 0;
    color: #c00023;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  p {
    margin: 4px 0;
    color: #666;
  }
`;

const Footer = styled.footer`
  background: #c00023;
  color: white;
  padding: 2rem;
  margin-top: 2rem;

  @media (max-width: 1000px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  img {
    height: 100px;
    object-fit: contain;
  }

  @media (max-width: 1000px) {
    img {
      height: 60px;
    }
  }
`;

const CompanyInfo = styled.div`
  flex: 1;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const CompanyName = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  p {
    margin: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    text-align: center;

    p {
      font-size: 0.9rem;
      justify-content: center;
    }
  }
`;

const GlobalStyle = styled.style`
  .custom-marker {
    filter: none;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>(dealersData.dealers);

  useEffect(() => {
    const term = normalizeText(searchTerm.trim());
    
    if (!term) {
      setFilteredDealers(dealersData.dealers);
      return;
    }

    const cityDealers = dealersData.dealers.filter(dealer => 
      normalizeText(dealer.city).includes(term)
    );

    if (cityDealers.length === 0) {
      const otherDealers = dealersData.dealers.filter(dealer => {
        const normalizedDistrict = normalizeText(dealer.district);
        const normalizedName = normalizeText(dealer.name);
        return normalizedDistrict.includes(term) || normalizedName.includes(term);
      });
      setFilteredDealers(otherDealers);
    } else {
      setFilteredDealers(cityDealers);
    }
  }, [searchTerm]);

  const bounds: L.LatLngBoundsExpression = [
    [35.8, 25.9],
    [42.1, 44.6]
  ];

  return (
    <AppContainer>
      <GlobalStyle>{`
        .custom-marker {
          filter: none;
        }
      `}</GlobalStyle>
      <MainHeader>
        <BoraLogo>
          <img src="/bora-teknik-logo.png" alt="Bora Teknik Logo" />
        </BoraLogo>
        <HeaderTitle>Bayilerimiz</HeaderTitle>
        <ShijingLogo>
          <img src="/shijing-logo.png" alt="Shijing Logo" />
        </ShijingLogo>
      </MainHeader>

      <MainContent>
        <SearchSection>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Bayi veya şehir ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </SearchSection>

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
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterLogo>
            <img src="/logo-bora-tek.png" alt="Bora Teknik Logo" />
          </FooterLogo>
          <CompanyInfo>
            <CompanyName>BORA TEKNİK HIRDAVAT VE İNŞAAT MALZEMELERİ SAN. TİC. LTD. ŞTİ.</CompanyName>
            <ContactInfo>
              <p>
                <a href="https://www.borahirdavat.com" target="_blank" rel="noopener noreferrer">
                  www.borahirdavat.com
                </a>
              </p>
              <p>
                <a href="mailto:info@borahirdavat.com">
                  info@borahirdavat.com
                </a>
              </p>
              <p>
                Arapçami mah. Galata Hırdavatçılar Çarşısı No: 47
                <br />
                Karaköy Beyoğlu / İstanbul
              </p>
              <p>
                0(212) 249 38 78
                <br />
                0545 149 14 79
              </p>
            </ContactInfo>
          </CompanyInfo>
        </FooterContent>
      </Footer>
    </AppContainer>
  );
}

export default App;

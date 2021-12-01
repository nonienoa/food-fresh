import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { Carousel } from 'react-bootstrap';
import { Carousel } from 'react-carousel-minimal';



const Wrapper = styled.div`
  overflow: hidden;
`

const Left = styled.div`
  color: var(--white);
  position: absolute;
  left: 7%;
  top: 40%;

  @media (max-width: 996px) {
    top: 30%;
  }
  @media (max-width: 567px) {
    top: 25%;
  }
`

const Right = styled.div`
  position: absolute;
  right: -7%;
  bottom: -1%;

  @media (max-width: 996px) {
    right: -10%;
  }
  @media (max-width: 567px) {
    right: -18%;
  }

  img {
    max-width: 80rem;
    width: 100%;
    height: 60rem;

    @media (max-width: 1200px) {
      height: 50rem;
    }
    @media (max-width: 996px) {
      height: 35rem;
    }
    @media (max-width: 567px) {
      height: 30rem;
    }
  }
`

const SubTitle = styled.span`
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    font-size: 1.7rem;
  }
  @media (max-width: 567px) {
    font-size: 1.6rem;
  }
`
const Title = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
  @media (max-width: 567px) {
    font-size: 3rem;
  }
`

const Small = styled.small`
  display: block;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
`

const HeroLink = styled(Link)`
  display: inline-block;
  color: var(--white);
  font-weight: 700;
  border: 2px solid var(--white);
  padding: 0.7rem 1.5rem;
  margin-top: 1rem;
  transition: all 300ms ease-out;

  :hover {
    color: var(--primary);
    background-color: var(--white);
  }
`

const Hero = () => {
  const data = [
    {
      image: "https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/6155789e8b993.png",
      caption: "San Francisco"
    },
    {
      image: "https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/61937a7418988.jpg",
      caption: "Scotland"
    },
    {
      image: "https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/619df4838fefa.jpg",
      caption: "Darjeeling"
    }
  ]
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <Wrapper>

        <h2>React Carousel Minimal</h2>
        <p>Easy to use, responsive and customizable carousel component for React Projects.</p>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={2000}
            width="100%"
            height="650px"
            captionStyle={captionStyle}
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>


    </Wrapper>
  )
}

export default Hero

{/* <Wrapper>
      <Carousel className="main-slider-carousel" fade autoPlay={true} interval={2500} controls={false} indicators={false} >
			<Carousel.Item className="slider-item">
				<img
				className="d-block w-100"
				src='https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/6155789e8b993.png'
				alt="First slide"
				/>
				<Carousel.Caption>
				<div className="slide-desc">
					<h3 className="h3-responsive">Buy Rice Products Are Now On Line With Us</h3>
				</div>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="slider-item">
				<img
				className="d-block w-100"
				src='https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/6155789e8b993.png'
				alt="Second slide"
				/>
				<Carousel.Caption>
				<div className="slide-desc">
					<h3 className="h3-responsive">Whole Spices Products Are Now On Line With Us</h3>
				</div>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="slider-item">
				<img
				className="d-block w-100"
				src='https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/6155789e8b993.png'
				alt="Third slide"
				/>
				<Carousel.Caption>
				<div className="slide-desc">
					<h3 className="h3-responsive">Whole Spices Products Are Now On Line With Us</h3>
				</div>
				</Carousel.Caption>
			</Carousel.Item>
			</Carousel>
      {/* <Left>
        <SubTitle>Exclusive Sales</SubTitle>
        <Title>UP TO 50% OFF ON SALES</Title>
        <Small>Get all exclusive offers for the season</Small>
        <HeroLink to='/'>View Collection</HeroLink>
      </Left>

      <Right>
        <img src='https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/6155789e8b993.png' alt='' />
      </Right> */}
    // </Wrapper> *
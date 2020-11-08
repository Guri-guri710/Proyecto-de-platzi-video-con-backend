import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/App.scss';
import Footer from '../components/Footer';

const App = ()=> (
    <div className='App'>
    <Header />
    <Search />

    <Categories title="Mi lista">
        <Carousel>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
        </Carousel>
    </Categories>

    <Categories title="Tendencias">
        <Carousel>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
        </Carousel>
    </Categories>

    <Categories title="Originalidades de platzi video">
        <Carousel>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
            <CarouselItem/>
        </Carousel>
    </Categories>

    <Footer />
    </div>
);

export default App;
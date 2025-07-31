import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronLeft } from "lucide-react";
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ProductTile from '@/components/shopping-view/product-tile';

const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
        const handleResize = () => setSize([window.innerWidth]);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};

function OversizedTshirtsSlider() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.shopProducts);
    const [width] = useWindowSize();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const trackRef = useRef(null);
    const itemWidthRef = useRef(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const swipeThreshold = 10;

    const itemsPerPage = width < 640 ? 2 : width < 1024 ? 3 : 4;

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: { subcategory: ['oversized tshirts'] }, sortParams: 'lowtohigh' }));
    }, [dispatch]);

    useEffect(() => {
        if (trackRef.current && trackRef.current.firstChild) {
            const itemNode = trackRef.current.firstChild;
            itemWidthRef.current = itemNode.offsetWidth;
        }
    }, [productList, itemsPerPage]);

    useEffect(() => {
        if (itemWidthRef.current) {
            setTranslateX(-currentIndex * itemWidthRef.current);
        }
    }, [currentIndex]);

    const handleNext = () => {
        const maxIndex = productList.length - itemsPerPage;
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > swipeThreshold) {
            handleNext();
        } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
            handlePrevious();
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <section className='py-12'>
            <div className='container mx-auto px-4'>
                <h2 className='text-xl md:text-2xl md:ml-10 font-bold text-left mb-8'>
                    Oversized T-shirts
                </h2>
                <div className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            transform: `translateX(${translateX}px)`,
                            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                            willChange: 'transform'
                        }}
                    >
                        {productList.map((productItem) => (
                            <div key={productItem.id} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 px-2">
                                <ProductTile product={productItem} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button onClick={handlePrevious} disabled={currentIndex === 0} className="px-4 py-2 mr-2 disabled:opacity-50 hover:cursor-pointer">
                        <ChevronLeft color="#050505" />
                    </button>
                    {`${currentIndex + 1} / ${productList.length > 0 ? productList.length - itemsPerPage + 1 : 1}`}
                    <button onClick={handleNext} disabled={currentIndex >= productList.length - itemsPerPage} className="px-4 py-2 ml-2 disabled:opacity-50 hover:cursor-pointer ">
                        <ChevronRight color="#050505" />
                    </button>
                </div>
                <div className="text-center mt-3">
                    <button onClick={() => navigate('/shop/oversized-t-shirts')}
                        className='bg-black text-white px-4 py-3 hover:cursor-pointer w-30'>View All</button>
                </div>
            </div>
        </section>
    );
}

export default OversizedTshirtsSlider;

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ShoppingHome.css'; // Make sure this CSS is adapted if needed
import OversizedTshirtsSlider from '@/components/shopping-view/OversizedTshirtsSlider';
import FeaturedProduct from '@/components/shopping-view/featured-product';

function ShoppingHome() {
    const navigate = useNavigate();
    const { productList } = useSelector((state) => state.shopProducts);

    return (
        <div>
            {/* ... Your banner code ... */}
            <div className="banner">
                <div className="slider hover:cursor-pointer" style={{ '--quantity': 10 }}>
                    <div onClick={() => navigate('/shop/product/687ba184726ec84942a5d816/bonkers-t-shirt')} className="item" style={{ '--position': 1 }}><img
                        src="/assets/Bonkerscorner_Black-nirvana_oversized-tshirt6_960x_crop_center.webp" alt="Bonkers" /></div>
                    <div onClick={() => navigate('/shop/product/687ba5b8726ec84942a5d854/gucci')} className="item" style={{ '--position': 2 }}><img src="/assets/download (1).jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd44c680944911aa08627/puffer-jacket')} className="item" style={{ '--position': 3 }}><img src="/assets/download (2).jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd4e5680944911aa08630/parada')} className="item" style={{ '--position': 4 }}><img src="/assets/download (3).jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd473680944911aa0862a/north-face-jacket')} className="item" style={{ '--position': 5 }}><img src="/assets/download.jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687ba5db726ec84942a5d857/jacket')} className="item" style={{ '--position': 6 }}><img src="/assets/JPEG.jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd492680944911aa0862d/ninja')} className="item" style={{ '--position': 7 }}><img src="/assets/No_ 321_ Journey Of The Ronin_.jpeg" alt="" />
                    </div>
                    <div onClick={() => navigate('/shop/product/687bd2e5eca455b996225160/essentials')} className="item" style={{ '--position': 8 }}><img src="/assets/poster essentials.jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd517680944911aa08633/luxury')} className="item" style={{ '--position': 9 }}><img
                        src="/assets/T-Shirt Design Ads for Social Media _ Fashion Branding - Sonoj ray.jpeg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/687bd52d680944911aa08636/hoodie')} className="item" style={{ '--position': 10 }}><img src="/assets/Winter Hoddie Social Media post design.jpeg"
                        alt="" /></div>
                </div>
                <div className="content">
                    <h1 data-content="GENZVERSE">
                        GENZVERSE
                    </h1>
                    <div className="model"></div>
                </div>
            </div>

            <OversizedTshirtsSlider />

            <div className=' p-4'>
                <div className='text-3xl font-bold lg:ml-10'>
                    Our Best Sellers
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-start gap-4  p-4 md:p-10">
                <div onClick={() => navigate('/shop/product/687ba5db726ec84942a5d857/jacket')} className='overflow-hidden w-full md:w-2/3'>
                    <img className='w-full h-auto md:h-[800px] lg:h-[1300px] object-cover transition-transform duration-300 hover:scale-101 hover:cursor-pointer'
                        src="/assets/JPEG.jpeg" alt="Jacket" />
                </div>
                <div className='w-full md:w-1/3 flex flex-row md:flex-col justify-start items-center gap-4'>
                    <div onClick={() => navigate('/shop/product/687bd44c680944911aa08627/puffer-jacket')} className='overflow-hidden hover:cursor-pointer hover:underline w-full'>
                        <img className='w-full h-auto object-cover transition-transform duration-300 hover:scale-101' src="/assets/download (2).jpeg" alt="Puffer Jacket" />
                        <div className='text-sm font-bold hover:underline block mt-2 sm:text-lg'>
                            Jacket
                        </div>
                    </div>
                    <div onClick={() => navigate('/shop/product/687bd4e5680944911aa08630/parada')} className='overflow-hidden hover:cursor-pointer hover:underline w-full'>
                        <img className='w-full h-auto object-cover transition-transform duration-300 hover:scale-101' src="/assets/download (3).jpeg" alt="Parada" />
                        <div className='text-sm font-bold hover:underline block mt-2 sm:text-lg'>Parada</div>
                    </div>
                </div>
            </div>
            <FeaturedProduct />
            {/* <div className='w-full h-0.5 bg-muted mt-6 mb-2'></div> */}
            <div className='flex items-center text-[10px] text-muted-foreground font-montserrat font-bold justify-center p-4 mt-6'>
            <div className='w-full md:w-1/2 text-center '>Genzverse, a streetwear brand born from the raw energy of urban culture. We
                    craft authentic, high-quality apparel for those who dare to express their unique story. More than just clothing,
                    our pieces are a statement of confidence, creativity, and unapologetic individuality. Every design is a nod to
                    the streets and a canvas for your personal narrative. We're here to empower you to own your look, make your
                    mark, and truly stand out. Join our movement and wear your truth. Follow us on Instagram to stay up-to-date on
                    all our latest drops and promotions</div>

            </div>
            <div className='w-full h-0.5 bg-muted mt-6 mb-2'></div>
        </div>
    );
}

export default ShoppingHome;

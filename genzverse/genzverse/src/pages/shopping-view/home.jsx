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
                    <div onClick={() => navigate('/shop/product/689b8ed83affaa4f6976fd05/itachi')} className="item" style={{ '--position': 1 }}><img
                        src="/assets/Itachi.jpg" alt="Bonkers" /></div>
                    <div onClick={() => navigate('/shop/product/689b8f083affaa4f6976fd08/bankai')} className="item" style={{ '--position': 2 }}><img src="/assets/Bankai.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8f333affaa4f6976fd0b/blue-lock')} className="item" style={{ '--position': 3 }}><img src="/assets/Blue lock.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8f593affaa4f6976fd0e/pagani')} className="item" style={{ '--position': 4 }}><img src="/assets/pagani.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8fa43affaa4f6976fd11/porsche-911')} className="item" style={{ '--position': 5 }}><img src="/assets/porsche.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8fd63affaa4f6976fd14/diablo')} className="item" style={{ '--position': 6 }}><img src="/assets/diablo.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8e143affaa4f6976fcf4/asthetic-1')} className="item" style={{ '--position': 7 }}><img src="/assets/asthetic 1.jpg" alt="" />
                    </div>
                    <div onClick={() => navigate('/shop/product/689b8e573affaa4f6976fcf7/aesthetic-2')} className="item" style={{ '--position': 8 }}><img src="/assets/asthetic 2.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8eb13affaa4f6976fd02/haikyu-')} className="item" style={{ '--position': 9 }}><img src="/assets/haikyu.jpg" alt="" /></div>
                    <div onClick={() => navigate('/shop/product/689b8f593affaa4f6976fd0e/pagani')} className="item" style={{ '--position': 10 }}><img src="/assets/pagani.jpg" alt="" /></div>
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
                    Cars
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-start gap-4  p-4 md:p-10">
                <div onClick={() => navigate('/shop/product/689b8fa43affaa4f6976fd11/porsche-911')} className='overflow-hidden w-full md:w-2/3'>
                    <img className='w-full h-auto md:h-[800px] lg:h-[1300px] object-cover transition-transform duration-300 hover:scale-101 hover:cursor-pointer'
                        src="/assets/porsche.jpg" alt="Jacket" />
                </div>
                <div className='w-full md:w-1/3 flex flex-row md:flex-col justify-start items-center gap-4'>
                    <div onClick={() => navigate('/shop/product/689b8f593affaa4f6976fd0e/pagani')} className='overflow-hidden hover:cursor-pointer hover:underline w-full'>
                        <img className='w-full h-auto object-cover transition-transform duration-300 hover:scale-101' src="/assets/pagani.jpg" alt="Puffer Jacket" />
                        <div className='text-sm font-bold hover:underline block mt-2 sm:text-lg'>
                            Pagani
                        </div>
                    </div>
                    <div onClick={() => navigate('/shop/product/689b8fd63affaa4f6976fd14/diablo')} className='overflow-hidden hover:cursor-pointer hover:underline w-full'>
                        <img className='w-full h-auto object-cover transition-transform duration-300 hover:scale-101' src="/assets/diablo.jpg" alt="Parada" />
                        <div className='text-sm font-bold hover:underline block mt-2 sm:text-lg'>Diablo</div>
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

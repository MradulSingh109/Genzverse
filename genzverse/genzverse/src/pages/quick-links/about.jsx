import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        About Genzverse
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Welcome to Genzverse, your ultimate destination for trendy and stylish
                        clothing for the modern generation.
                    </p>
                </div>
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            <p className="mt-4 text-gray-600">
                                At Genzverse, our mission is to empower the youth to express
                                their individuality through fashion. We believe that clothing
                                is a powerful tool for self-expression, and we are committed
                                to providing our customers with high-quality, affordable,
                                and fashionable apparel that reflects the latest trends.
                            </p>
                        </div>
                        <div>
                            <img
                                className="rounded-lg shadow-lg"
                                src="/assets/bg.png"
                                alt="Genzverse Team"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                className="rounded-lg shadow-lg"
                                src="/assets/model.png"
                                alt="Genzverse Store"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
                            <p className="mt-4 text-gray-600">
                                Genzverse was born out of a passion for fashion and a
                                desire to create a brand that resonates with the Gen Z
                                lifestyle. Our founders, a group of young and ambitious
                                entrepreneurs, noticed a gap in the market for a clothing
                                brand that truly understands the needs and preferences of the
                                younger generation. And so, Genzverse was born.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

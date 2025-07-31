import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Refund Policy
          </h2>
        </div>
        <div className="mt-10 prose prose-lg text-gray-600 mx-auto">
          <h3>1. Returns</h3>
          <p>
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>
          <p>
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
          <p>
            To start a return, you can contact us at support@genzverse.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
          <h3>2. Damages and issues</h3>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>
          <h3>3. Exceptions / non-returnable items</h3>
          <p>
            Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
          </p>
          <p>
            Unfortunately, we cannot accept returns on sale items or gift cards.
          </p>
          <h3>4. Exchanges</h3>
          <p>
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
          <h3>5. Refunds</h3>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

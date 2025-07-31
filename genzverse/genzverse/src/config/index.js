
export const registerFormControls = [{
    name: 'userName',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    required: true,
    componentType: 'input',
}, {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
    componentType: 'input',
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    componentType: 'input',
}
]



export const loginFormControls = [{
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
    componentType: 'input',
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    componentType: 'input',
}
]


export const addProductFormElements = [
    {
        label: 'Title',
        name: 'title',
        type: 'text',
        placeholder: 'Enter product title',
        type: 'text',
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter product description',
        style: { height: "150px" }
    },
    {
        label: 'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter product price',
    },
    // {
    //     label: 'Image URL',
    //     name: 'imageUrl',
    //     type: 'text',
    //     placeholder: 'Enter image URL',
    // },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        placeholder: 'Enter product category',
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
        ]
    },
    {
        label: 'Subcategory',
        name: 'subcategory',
        componentType: 'select',
        placeholder: 'Enter product subcategory',
        options: [
            { id: "oversized tshirts", label: "Oversized T-shirts" },
        ]
    },
    {
        label: 'Sizes',
        name: 'sizes',
        type: 'text',
        placeholder: 'Enter sizes, comma separated',
        componentType: 'input',
    },
    {
        label: 'Stock',
        name: 'stock',
        type: 'number',
        placeholder: 'Enter product stock',
        componentType: 'input',
    },
    {
        label: "Sale Price",
        name: "salePrice",
        type: "number",
        componentType: "input",
        placeholder: "Enter sale price (optional)",
    }
]

export const filterOptions = [
    {
        id: "men",
        label: "Men"
    },
    {
        id: "women",
        label: "Women"
    }
]

export const sortOptions = [
    {
        id: "lowtohigh",
        label: "Price: Low to High"
    },
    {
        id: "hightolow",
        label: "Price: High to Low"
    }
]

export const addressFormControls = [
    {
        name: 'address',
        label: 'Address',
        type: 'text',
        placeholder: 'Enter your address',
        required: true,
        componentType: 'input',
    },
    {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'Enter your city',
        required: true,
        componentType: 'input',
    },
    {
        name: 'pincode',
        label: 'Pincode',
        type: 'number',
        placeholder: 'Enter your pincode',
        required: true,
        componentType: 'input',
    },
    {
        name: 'state',
        label: 'State',
        type: 'text',
        placeholder: 'Enter your state',
        required: true,
        componentType: 'input',
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'number',
        placeholder: 'Enter your phone number',
        required: true,
        componentType: 'input',
    },
    {
        name: 'notes',
        label: 'Notes',
        type: 'text',
        placeholder: 'Enter any additional notes',
        required: false,
        componentType: 'textarea',
    },
]

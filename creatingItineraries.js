
require('dotenv').config();
const db = require('./config/database');

const Itinerary = require('./models/Itinerary');

const ourItineraries = [
    {   
        name:'Iti 1',
        user: "6319b98af587b99d89bf4e1e",
        city: '630ed7e6ebebecae1587b1b9',
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 2',
        user: "6319b98af587b99d89bf4e1f",
        city: "630ed8862dc4a51ed1e2fd6b",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 3',
        user: "6319b98af587b99d89bf4e20",
        city: "630ed8d5b576af8e303593c3",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 4',
        user: "6319b98af587b99d89bf4e1e",
        city: "630ed9648a99a04e3bcbd1d7",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 4',
        user: "6319b98af587b99d89bf4e1f",
        city: "630ed9648a99a04e3bcbd1d7",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 5',
        user: "6319b98af587b99d89bf4e20",
        city: "630ed983ff327fa26b76b550",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 5',
        user: "6319b98af587b99d89bf4e1e",
        city: "630ed983ff327fa26b76b550",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 6',
        user: "6319b98af587b99d89bf4e1f",
        city: "630ed9b8bbf63451a48d3af4",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 6',
        user: "6319b98af587b99d89bf4e20",
        city: "630ed9b8bbf63451a48d3af4",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 7',
        user: "6319b98af587b99d89bf4e1e",
        city: "630ed9cbdef360b4f0357f31",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 7',
        user: "6319b98af587b99d89bf4e1f",
        city: "630ed9cbdef360b4f0357f31",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itinera 7',
        user: "6319b98af587b99d89bf4e20",
        city: "630ed9cbdef360b4f0357f31",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 8',
        user: "6319b98af587b99d89bf4e1e",
        city: "630eda004410c436e7f9b4fe",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 8',
        user: "6319b98af587b99d89bf4e1f",
        city: "630eda004410c436e7f9b4fe",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itinera 8',
        user: "6319b98af587b99d89bf4e20",
        city: "630eda004410c436e7f9b4fe",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Iti 9',
        user: "6319b98af587b99d89bf4e1e",
        city: "630eda28936786bea3949855",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itine 9',
        user: "6319b98af587b99d89bf4e1f",
        city: "630eda28936786bea3949855",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    },
    {   
        name:'Itinera 9',
        user: "6319b98af587b99d89bf4e20",
        city: "630eda28936786bea3949855",
        price: 1000,
        likes: [],
        tags: [],
        duration: 1
    }
];

ourItineraries.forEach(element=> Itinerary.create(element));
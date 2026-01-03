// data.js - Simple test data
console.log("data.js is loading...");

const componentsData = [
    {
        id: "angle-clip",
        title: "Angle Clip",
        thumbnail: "Assets/Components/Angle Clip/thumbnail.jpg",
        images: [
            "Assets/Components/Angle Clip/image1.jpg",
            "Assets/Components/Angle Clip/image2.jpg"
        ],
        videos: [],
        drawing: "",
        model3d: ""
    },
    {
        id: "test-component",
        title: "Test Component",
        thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
        ],
        videos: [
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ],
        drawing: "",
        model3d: ""
    }
];

const assembliesData = [
    {
        id: "geneva-wheel",
        title: "Geneva Wheel",
        thumbnail: "Assets/Assemblies/Geneva Wheel/thumbnail.jpg",
        images: [
            "Assets/Assemblies/Geneva Wheel/image1.jpg",
            "Assets/Assemblies/Geneva Wheel/image2.jpg"
        ],
        videos: [],
        drawing: "",
        model3d: ""
    }
];

console.log("Data loaded:", {
    components: componentsData.length,
    assemblies: assembliesData.length
});
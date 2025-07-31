import React, { useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Film, X, ArrowLeft } from 'lucide-react';

const videoData = [
  {
    id: 1,
    title: "AI Commercial",
    thumbnail: "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    orientation: "landscape"
  },
  {
    id: 2,
    title: "Tech Animation",
    thumbnail: "https://images.pexels.com/videos/6153354/free-video-6153354.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/jNQXAC9IVRw",
    orientation: "vertical"
  },
  {
    id: 3,
    title: "Product Showcase",
    thumbnail: "https://images.pexels.com/videos/4752176/free-video-4752176.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/M7lc1UVf-VE",
    orientation: "landscape"
  },
  {
    id: 4,
    title: "Lamborghini",
    thumbnail: "https://images.pexels.com/videos/3209828/free-video-3209828.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/YyNz4--6fro",
    orientation: "vertical"
  },
  {
    id: 5,
    title: "Motion Graphics",
    thumbnail: "https://images.pexels.com/videos/6774139/free-video-6774139.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/L_jWHffIx5E",
    orientation: "landscape"
  },
  {
    id: 6,
    title: "AI Visualization",
    thumbnail: "https://images.pexels.com/videos/4752176/free-video-4752176.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/9bZkp7q19f0",
    orientation: "vertical"
  },
  {
    id: 7,
    title: "Digital Art",
    thumbnail: "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    orientation: "landscape"
  },
  {
    id: 8,
    title: "Future Tech",
    thumbnail: "https://images.pexels.com/videos/6153354/free-video-6153354.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    video: "https://www.youtube.com/embed/fJ9rUzIMcZQ",
    orientation: "vertical"
  }
];

const Navigation = ({ activeItem, setActiveItem }: { 
  activeItem: string, 
  setActiveItem: (item: string) => void 
}) => {
  const navItems = [
    { id: 'home', label: 'Home Page' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/180 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-left">
            <img 
              src="/logo.png" 
              alt="Movico Studio" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative px-3 py-2 text-lg font-medium transition-all duration-300 ${
                  activeItem === item.id
                    ? 'text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
                {activeItem === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-black to-gray-800 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-black p-2">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-current" />
                <div className="w-full h-0.5 bg-current" />
                <div className="w-full h-0.5 bg-current" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const VideoModal = ({ video, isOpen, onClose }: { 
  video: typeof videoData[0] | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300"
        >
          <X className="w-8 h-8" />
        </button>
        
        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-video">
            <iframe
              src={`${video.video}?autoplay=1`}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Video Info */}
          <div className="p-6 bg-white">
            <h3 className="text-xl font-semibold text-black mb-2">{video.title}</h3>
            <p className="text-gray-600">AI-generated content showcasing creative possibilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video, index, onPlay, isGrid = false }: { 
  video: typeof videoData[0], 
  index: number,
  onPlay: (video: typeof videoData[0]) => void,
  isGrid?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(video);
  };

  const isVertical = video.orientation === 'vertical';

  if (isGrid) {
    return (
      <div className="relative group">
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 aspect-video bg-gray-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          {/* Thumbnail */}
          <div className="relative w-full h-full">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Play Icon */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            onClick={handlePlayClick}
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 cursor-pointer hover:bg-white/30 transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-white font-medium text-sm">{video.title}</h3>
          </div>

          {/* Hover Effect */}
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              isHovered ? 'ring-2 ring-black/30 transform scale-105' : ''
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-shrink-0 h-64">
      <div
        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 h-64 ${
          isVertical ? 'w-40' : 'w-80'
        } ${
          isHovered ? 'transform scale-105 shadow-2xl shadow-black/20' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        
        {/* Thumbnail */}
        <div className="relative w-full h-full">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Play Icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          onClick={handlePlayClick}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 cursor-pointer hover:bg-white/30 transition-all duration-300">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-white font-medium text-sm">{video.title}</h3>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isHovered ? 'ring-2 ring-black/30' : ''
          }`}
        />
      </div>
    </div>
  );
};

const VideoCarousel = ({ onVideoPlay }: { onVideoPlay: (video: typeof videoData[0]) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Create enough copies for seamless infinite scroll
  const duplicatedVideoData = [...videoData, ...videoData, ...videoData, ...videoData];

  // Auto-scroll functionality
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 0.8; // pixels per frame

    const autoScroll = () => {
      if (!isPaused && !isHovered && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Calculate when to reset for seamless loop
        const singleSetWidth = (scrollContainer.scrollWidth / 4); // Since we have 4 copies
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft = singleSetWidth; // Reset to second set
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, isHovered]);

  // Handle mouse enter/leave for the entire carousel
  const handleCarouselMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCarouselMouseLeave = () => {
    setIsHovered(false);
  };

  const scroll = (direction: 'left' | 'right') => {
    // Stop auto-scroll permanently when buttons are used
    setIsPaused(true);
    
    if (scrollRef.current) {
      const scrollAmount = 320; // Adjust based on card width + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleCarouselMouseEnter}
      onMouseLeave={handleCarouselMouseLeave}
    >
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 text-black hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 text-black hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Video Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        {duplicatedVideoData.map((video, index) => (
          <VideoCard 
            key={`${video.id}-${index}`} 
            video={video} 
            index={index} 
            onPlay={onVideoPlay}
          />
        ))}
      </div>
      
      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};

const PortfolioPage = ({ onVideoPlay, onBack }: { 
  onVideoPlay: (video: typeof videoData[0]) => void,
  onBack: () => void 
}) => {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.05),transparent_50%)]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">Back to Home</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            Explore our collection of AI-generated advertisements and short films that showcase the future of creative storytelling.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {videoData.map((video, index) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              index={index} 
              onPlay={onVideoPlay}
              isGrid={true}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-12 text-sm text-gray-500">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">{videoData.length}+</div>
              <div>Creative Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div>AI Generated</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">∞</div>
              <div>Creative Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onVideoPlay }: { onVideoPlay: (video: typeof videoData[0]) => void }) => {
  return (
    <>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.05),transparent_50%)]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-20 lg:py-16">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl lg:pr-12 text-center lg:text-left mb-12 lg:mb-0">
          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
              AI-Generated Ads & Short Films
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
              
            </span>
            <br />
            <span className="text-black">
             
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            Unleashing storytelling with AI creativity.
          </p>

          {/* CTA Button */}
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-black to-gray-800 rounded-full hover:from-gray-800 hover:to-black hover:scale-105 hover:shadow-2xl hover:shadow-black/25">
            <span className="relative z-10">Start Creating Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-sm text-gray-500">
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-black">50+</div>
              <div>Advertisements Created</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-black">10+</div>
              <div>Happy Clients</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center lg:text-left">
              <div className="text-5xl font-bold text-black">99%</div>
              <div>Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right Content - Video Carousel */}
        <div className="flex-1 w-full lg:max-w-2xl">
          <div className="relative">
            <h3 className="text-black text-xl font-semibold mb-6 text-center lg:text-left">
              AI Masterpieces in Motion
            </h3>
            <VideoCarousel onVideoPlay={onVideoPlay} />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-2 h-2 bg-black rounded-full animate-pulse" />
      <div className="absolute top-52 right-20 w-1 h-1 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-gray-800 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-40 w-1 h-1 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50/95 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/logo.png" 
                  alt="Movico Studio" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
                Pioneering the future of storytelling through AI-powered video creation. Transform your ideas into stunning visual narratives.
              </p>
              <div className="flex space-x-4">
                <button className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                  <div className="w-5 h-5 bg-current" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                </button>
                <button className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                  <div className="w-5 h-5 bg-current rounded-full" />
                </button>
                <button className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-300">
                  <div className="w-5 h-5 bg-current" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }} />
                </button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-black font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">AI Video Generation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Commercial Production</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Short Film Creation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Brand Storytelling</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Motion Graphics</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-black font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="text-gray-600">
                  <span className="block text-sm text-gray-500">Email</span>
                  hello@movico.studio
                </li>
                <li className="text-gray-600">
                  <span className="block text-sm text-gray-500">Phone</span>
                  +1 (555) 123-4567
                </li>
                <li className="text-gray-600">
                  <span className="block text-sm text-gray-500">Address</span>
                  123 Creative District<br />
                  Los Angeles, CA 90028
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Movico Studio. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

function App() {
  const [activeItem, setActiveItem] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<typeof videoData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoPlay = (video: typeof videoData[0]) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleBackToHome = () => {
    setActiveItem('home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Page Content */}
      {activeItem === 'home' && <HomePage onVideoPlay={handleVideoPlay} />}
      {activeItem === 'portfolio' && (
        <PortfolioPage onVideoPlay={handleVideoPlay} onBack={handleBackToHome} />
      )}
      {activeItem === 'about' && <HomePage onVideoPlay={handleVideoPlay} />}
      {activeItem === 'contact' && <HomePage onVideoPlay={handleVideoPlay} />}
      
      {/* Video Modal */}
      <VideoModal 
        video={selectedVideo} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;
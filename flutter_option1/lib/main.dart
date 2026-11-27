import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Color(0xFFE61114),
      statusBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const ChinzoApp());
}

class ChinzoColors {
  static const Color red = Color(0xFFE61114);
  static const Color redDark = Color(0xFFC40C0F);
  static const Color redBright = Color(0xFFFF4245);
  static const Color surface = Color(0xFFF6F6F8);
  static const Color cardBg = Color(0xFFF8F8FA);
  static const Color ink = Color(0xFF18181B);
  static const Color muted = Color(0xFF646773);
  static const Color darkDock = Color(0xFF16171B);
  static const Color green = Color(0xFF16A34A);
  static const Color gold = Color(0xFFFACC15);
}

class ChinzoLocation {
  final String id;
  final String label;
  final String detail;
  final String eta;

  const ChinzoLocation({
    required this.id,
    required this.label,
    required this.detail,
    required this.eta,
  });
}

class ChinzoCategory {
  final String id;
  final String name;
  final String group;
  final String image;

  const ChinzoCategory({
    required this.id,
    required this.name,
    required this.group,
    required this.image,
  });
}

class ChinzoProduct {
  final String id;
  final String section;
  final String category;
  final String? badge;
  final bool isKicker;
  final String title;
  final String priceBD;
  final double priceNum;
  final String? originalPrice;
  final int? discountPercent;
  final String rating;
  final String reviews;
  final String? rankNote;
  final bool isInstant;
  final String deliveryLabel;
  final String image;

  const ChinzoProduct({
    required this.id,
    required this.section,
    required this.category,
    this.badge,
    this.isKicker = false,
    required this.title,
    required this.priceBD,
    required this.priceNum,
    this.originalPrice,
    this.discountPercent,
    required this.rating,
    required this.reviews,
    this.rankNote,
    required this.isInstant,
    required this.deliveryLabel,
    required this.image,
  });
}

class ChinzoCoupon {
  final String code;
  final String headline;
  final String subline;
  final String image;

  const ChinzoCoupon({
    required this.code,
    required this.headline,
    required this.subline,
    required this.image,
  });
}

const kLocations = [
  ChinzoLocation(id: 'manama', label: 'Other · Manama', detail: 'Manama Center, Bahrain', eta: 'Get in 1 hr 8 mins'),
  ChinzoLocation(id: 'seef', label: 'Seef District · Manama', detail: 'Seef Mall Area, Bahrain', eta: 'Get in 45 mins'),
  ChinzoLocation(id: 'juffair', label: 'Juffair · Manama', detail: 'Al Fateh Highway, Bahrain', eta: 'Get in 55 mins'),
  ChinzoLocation(id: 'riffa', label: 'West Riffa · Bahrain', detail: 'Bukowarah, Bahrain', eta: 'Express Tomorrow'),
  ChinzoLocation(id: 'muharraq', label: 'Amwaj · Muharraq', detail: 'Amwaj Islands, Bahrain', eta: 'Express Tomorrow'),
];

const kDepartments = [
  'Electronics',
  'Beauty & Fragrance',
  'Home & Kitchen',
  'Grocery',
  "Men's Fashion",
  "Women's Fashion",
  'Mom & Baby',
  'Toys',
  "Kids' Fashion",
  'Sports & Outdoors',
  'Health & Nutrition',
  'Stationery',
  'Books',
  'Automotive',
];

const kCategoryTabs = ['Featured', "Kids' Fashion", 'Grocery', 'Books & Media', 'Wellness'];

const kCategories = [
  ChinzoCategory(id: 'cat-deals', name: 'Daily Deals', group: 'Featured', image: 'assets/chinzo/deal_cream.png'),
  ChinzoCategory(id: 'cat-laptops', name: 'Laptops & Tech', group: 'Featured', image: 'assets/chinzo/laptop_mac_m5.jpg'),
  ChinzoCategory(id: 'cat-beverages', name: 'Beverages', group: 'Featured', image: 'assets/chinzo/cat_groc_beverages.jpg'),
  ChinzoCategory(id: 'cat-snacks', name: 'Snacks & Sweets', group: 'Featured', image: 'assets/chinzo/cat_groc_snacks.jpg'),
  ChinzoCategory(id: 'cat-kids-tees', name: "Kids' T-Shirts", group: 'Featured', image: 'assets/chinzo/cat_kids_tshirts.jpg'),
  ChinzoCategory(id: 'cat-backpacks', name: 'Backpacks', group: 'Featured', image: 'assets/chinzo/cat_kids_backpacks.jpg'),
  ChinzoCategory(id: 'cat-books', name: 'Self-help Books', group: 'Featured', image: 'assets/chinzo/cat_book_selfhelp.jpg'),
  ChinzoCategory(id: 'cat-wellness', name: 'Vitamins', group: 'Featured', image: 'assets/chinzo/wellness_centrum.jpg'),
  ChinzoCategory(id: 'kids-tshirts', name: 'T-Shirts & Polos', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_tshirts.jpg'),
  ChinzoCategory(id: 'kids-pants', name: 'Pants', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_pants.jpg'),
  ChinzoCategory(id: 'kids-sets', name: 'Clothing Sets', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_sets.jpg'),
  ChinzoCategory(id: 'kids-dresses', name: 'Dresses', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_dresses.jpg'),
  ChinzoCategory(id: 'kids-footwear', name: 'Footwear', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_footwear.jpg'),
  ChinzoCategory(id: 'kids-backpacks', name: 'Backpacks', group: "Kids' Fashion", image: 'assets/chinzo/cat_kids_backpacks.jpg'),
  ChinzoCategory(id: 'groc-beverages', name: 'Beverages', group: 'Grocery', image: 'assets/chinzo/cat_groc_beverages.jpg'),
  ChinzoCategory(id: 'groc-laundry', name: 'Laundry & Dish', group: 'Grocery', image: 'assets/chinzo/cat_groc_laundry.jpg'),
  ChinzoCategory(id: 'groc-pets', name: 'Pet Supplies', group: 'Grocery', image: 'assets/chinzo/cat_groc_pets.jpg'),
  ChinzoCategory(id: 'groc-oils', name: 'Cooking Oils', group: 'Grocery', image: 'assets/chinzo/cat_groc_oils.jpg'),
  ChinzoCategory(id: 'groc-rice', name: 'Rice & Pasta', group: 'Grocery', image: 'assets/chinzo/cat_groc_rice.jpg'),
  ChinzoCategory(id: 'groc-snacks', name: 'Snacks & Sweets', group: 'Grocery', image: 'assets/chinzo/cat_groc_snacks.jpg'),
  ChinzoCategory(id: 'book-selfhelp', name: 'Self-help books', group: 'Books & Media', image: 'assets/chinzo/cat_book_selfhelp.jpg'),
  ChinzoCategory(id: 'book-children', name: "Children's books", group: 'Books & Media', image: 'assets/chinzo/cat_book_children.jpg'),
  ChinzoCategory(id: 'book-fiction', name: 'Fiction', group: 'Books & Media', image: 'assets/chinzo/cat_book_fiction.jpg'),
  ChinzoCategory(id: 'book-ereaders', name: 'E-readers', group: 'Books & Media', image: 'assets/chinzo/cat_book_ereaders.jpg'),
  ChinzoCategory(id: 'book-guitars', name: 'Guitars', group: 'Books & Media', image: 'assets/chinzo/cat_book_guitars.jpg'),
  ChinzoCategory(id: 'well-protein', name: 'Sports Nutrition', group: 'Wellness', image: 'assets/chinzo/wellness_protein.jpg'),
  ChinzoCategory(id: 'well-vitamins', name: 'Vitamins', group: 'Wellness', image: 'assets/chinzo/wellness_centrum.jpg'),
  ChinzoCategory(id: 'well-monitors', name: 'Health Monitors', group: 'Wellness', image: 'assets/chinzo/wellness_braun.jpg'),
  ChinzoCategory(id: 'well-massage', name: 'Recovery Tools', group: 'Wellness', image: 'assets/chinzo/wellness_renpho.jpg'),
];

const kMegaDeals = [
  ChinzoProduct(
    id: 'mega-xiaomi-17',
    section: 'mega',
    category: 'Mobile deals',
    badge: 'Mobile deals',
    isKicker: true,
    title: 'Xiaomi REDMI Note 17 Pro Max Dual SIM 5G Black 8GB RAM 256GB',
    priceBD: '10.200 BD',
    priceNum: 10.2,
    originalPrice: '17.990 BD',
    discountPercent: 43,
    rating: '4.8',
    reviews: '412',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/mega_xiaomi.jpg',
  ),
  ChinzoProduct(
    id: 'mega-ratsaw-knee',
    section: 'mega',
    category: 'Massage & Relaxation',
    badge: 'Massage deals',
    isKicker: true,
    title: 'RATSAW Heated Knee Massager Cordless Knee Massage Machine',
    priceBD: '8.100 BD',
    priceNum: 8.1,
    originalPrice: '15.900 BD',
    discountPercent: 49,
    rating: '4.6',
    reviews: '188',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/mega_ratsaw.jpg',
  ),
  ChinzoProduct(
    id: 'mega-acer-al15',
    section: 'mega',
    category: 'Laptops deals',
    badge: 'Laptops deals',
    isKicker: true,
    title: 'Acer Aspire Lite AL15 Laptop with 13th Gen Intel Core i7-1355U',
    priceBD: '3.500 BD',
    priceNum: 3.5,
    originalPrice: '34.990 BD',
    discountPercent: 90,
    rating: '4.7',
    reviews: '305',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/mega_acer.jpg',
  ),
  ChinzoProduct(
    id: 'mega-nestle-water',
    section: 'mega',
    category: 'Home Care & Cleaning',
    badge: 'Home Care deals',
    isKicker: true,
    title: 'Nestle Pure Life, Low Sodium, Bottled Drinking Water 1.5L Pack of 6',
    priceBD: '5.100 BD',
    priceNum: 5.1,
    originalPrice: '16.000 BD',
    discountPercent: 68,
    rating: '4.9',
    reviews: '1.2K',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/mega_nestle.jpg',
  ),
];

const kLaptopDeals = [
  ChinzoProduct(
    id: 'lap-mac-neo-pink',
    section: 'laptops',
    category: 'Electronics',
    badge: 'Best Seller',
    title: 'Apple MacBook Neo | 13-Inch Display | A18 Pro, 6-core CPU, 256GB',
    priceBD: '2.820 BD',
    priceNum: 2.82,
    originalPrice: '3.499 BD',
    discountPercent: 19,
    rating: '4.7',
    reviews: '1.1K',
    rankNote: '#9 in Macbooks',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/laptop_mac_pink.jpg',
  ),
  ChinzoProduct(
    id: 'lap-mac-air-m5',
    section: 'laptops',
    category: 'Electronics',
    badge: 'Best Seller',
    title: 'Apple New 2026 MacBook Air MDHA4 13 Inch | M5 Air 16GB RAM',
    priceBD: '4.899 BD',
    priceNum: 4.899,
    originalPrice: '6.199 BD',
    discountPercent: 20,
    rating: '4.6',
    reviews: '627',
    rankNote: '#5 in Macbooks',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/laptop_mac_m5.jpg',
  ),
  ChinzoProduct(
    id: 'lap-mac-neo-blue',
    section: 'laptops',
    category: 'Electronics',
    badge: 'Best Seller',
    title: 'Apple MacBook Neo | 13-Inch Display | A18 Pro Midnight 256GB',
    priceBD: '2.694 BD',
    priceNum: 2.694,
    originalPrice: '3.499 BD',
    discountPercent: 23,
    rating: '4.7',
    reviews: '1.1K',
    rankNote: '#2 in Macbooks',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/laptop_mac_blue.jpg',
  ),
  ChinzoProduct(
    id: 'lap-hp-g6',
    section: 'laptops',
    category: 'Electronics',
    badge: 'Refurbished',
    title: 'HP Refurbished Elitebook 840 G6 14-Inch Full HD, Core i5-8265U',
    priceBD: '8.200 BD',
    priceNum: 8.2,
    rating: '3.9',
    reviews: '16',
    rankNote: '#12 in Laptops',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/laptop_hp_g6.jpg',
  ),
];

const kTopBrandDeals = [
  ChinzoProduct(
    id: 'brand-anker-25k',
    section: 'brands',
    category: 'Electronics',
    badge: 'Best Seller',
    title: 'Anker 25,000 mAh 165W Ultra-Fast Portable Charger for Laptops',
    priceBD: '28.500 BD',
    priceNum: 28.5,
    originalPrice: '48.900 BD',
    discountPercent: 40,
    rating: '4.6',
    reviews: '2.7K',
    rankNote: '#1 in Power Banks',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/brand_anker_25k.jpg',
  ),
  ChinzoProduct(
    id: 'brand-crony-22l',
    section: 'brands',
    category: 'Automotive',
    title: 'CRONY Car Refrigerator 22L/C22 Portable Car Freezer & Cooler',
    priceBD: '8.500 BD',
    priceNum: 8.5,
    originalPrice: '14.400 BD',
    discountPercent: 41,
    rating: '4.3',
    reviews: '21',
    rankNote: '#5 in Car Coolers',
    isInstant: false,
    deliveryLabel: 'Express Tomorrow',
    image: 'assets/chinzo/brand_crony_fridge.jpg',
  ),
  ChinzoProduct(
    id: 'brand-geepas-6pc',
    section: 'brands',
    category: 'Home & Kitchen',
    badge: 'Best Seller',
    title: 'GEEPAS Screwdriver Set - 6Pcs, General Purpose Rubber Insulated',
    priceBD: '28.500 BD',
    priceNum: 28.5,
    rating: '4.5',
    reviews: '21',
    rankNote: '#2 in Screwdrivers',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/brand_geepas_tools.jpg',
  ),
  ChinzoProduct(
    id: 'brand-anker-zolo',
    section: 'brands',
    category: 'Electronics',
    title: 'Anker 20,000 mAh Zolo Power Bank 30W High-Speed Portable Charger',
    priceBD: '13.100 BD',
    priceNum: 13.1,
    originalPrice: '22.900 BD',
    discountPercent: 39,
    rating: '4.6',
    reviews: '1.8K',
    rankNote: 'Lowest price in 30d',
    isInstant: true,
    deliveryLabel: 'Get in 1 hr 8 mins',
    image: 'assets/chinzo/brand_anker_zolo.jpg',
  ),
];

const kCoupons = [
  ChinzoCoupon(
    code: 'APPLIANCE10',
    headline: 'Extra 10% Off',
    subline: 'On selected large appliances',
    image: 'assets/chinzo/coupon_appliance.jpg',
  ),
  ChinzoCoupon(
    code: 'CAMERAS20',
    headline: 'Extra 20% Off',
    subline: 'On selected cameras & gear',
    image: 'assets/chinzo/coupon_cameras.jpg',
  ),
  ChinzoCoupon(
    code: 'SAVE10',
    headline: 'Extra 10% OFF',
    subline: 'On Grocery & CHINZO Market',
    image: 'assets/chinzo/coupon_grocery.jpg',
  ),
];

class ChinzoApp extends StatelessWidget {
  const ChinzoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Chinzo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: ChinzoColors.surface,
        colorScheme: ColorScheme.fromSeed(seedColor: ChinzoColors.red),
      ),
      home: const ChinzoHomeOption1Screen(),
    );
  }
}

class ChinzoHomeOption1Screen extends StatefulWidget {
  const ChinzoHomeOption1Screen({super.key});

  @override
  State<ChinzoHomeOption1Screen> createState() => _ChinzoHomeOption1ScreenState();
}

class _ChinzoHomeOption1ScreenState extends State<ChinzoHomeOption1Screen> {
  final ScrollController _scrollController = ScrollController();
  final PageController _heroController = PageController();
  final TextEditingController _searchController = TextEditingController();

  final GlobalKey _categoriesKey = GlobalKey();
  final GlobalKey _megaDealsKey = GlobalKey();
  final GlobalKey _laptopDealsKey = GlobalKey();
  final GlobalKey _topBrandsKey = GlobalKey();

  String _selectedLocationId = 'manama';
  String _activeCategoryTab = 'Featured';
  String? _selectedCategoryId;
  int _heroIndex = 0;
  int _activeNavIndex = 0;
  String? _copiedCode;
  String _searchQuery = '';

  final Set<String> _wishlistIds = {'lap-mac-neo-pink', 'brand-anker-25k'};
  final Map<String, int> _cart = {'mega-xiaomi-17': 1};

  late int _secondsLeft;
  Timer? _countdownTimer;
  Timer? _heroTimer;

  List<ChinzoProduct> get _allProducts => [
        ...kMegaDeals,
        ...kLaptopDeals,
        ...kTopBrandDeals,
      ];

  ChinzoLocation get _currentLocation => kLocations.firstWhere(
        (l) => l.id == _selectedLocationId,
        orElse: () => kLocations.first,
      );

  int get _totalCartCount => _cart.values.fold(0, (sum, q) => sum + q);

  @override
  void initState() {
    super.initState();
    _secondsLeft = 14 * 3600 + 37 * 60 + 21;
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _secondsLeft = _secondsLeft > 0 ? _secondsLeft - 1 : 14 * 3600 + 37 * 60 + 21;
      });
    });

    _heroTimer = Timer.periodic(const Duration(seconds: 5), (_) {
      if (!mounted || !_heroController.hasClients) return;
      final next = (_heroIndex + 1) % 3;
      _heroController.animateToPage(
        next,
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeOutCubic,
      );
    });
  }

  @override
  void dispose() {
    _countdownTimer?.cancel();
    _heroTimer?.cancel();
    _scrollController.dispose();
    _heroController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  String get _formattedCountdown {
    final hrs = _secondsLeft ~/ 3600;
    final mins = (_secondsLeft % 3600) ~/ 60;
    final secs = _secondsLeft % 60;
    String pad(int n) => n.toString().padLeft(2, '0');
    return '${pad(hrs)} : ${pad(mins)} : ${pad(secs)}';
  }

  void _showToast(String message) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          content: Text(message, style: const TextStyle(fontWeight: FontWeight.w600)),
          behavior: SnackBarBehavior.floating,
          backgroundColor: ChinzoColors.ink,
          duration: const Duration(seconds: 2),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
  }

  void _toggleWishlist(String id) {
    setState(() {
      if (_wishlistIds.contains(id)) {
        _wishlistIds.remove(id);
        _showToast('Removed from Wishlist');
      } else {
        _wishlistIds.add(id);
        _showToast('Saved to Wishlist');
      }
    });
  }

  void _addToCart(String id) {
    setState(() {
      _cart[id] = (_cart[id] ?? 0) + 1;
    });
    _showToast('Added to Chinzo Cart');
  }

  void _decrementCart(String id) {
    setState(() {
      final qty = (_cart[id] ?? 0) - 1;
      if (qty <= 0) {
        _cart.remove(id);
      } else {
        _cart[id] = qty;
      }
    });
  }

  void _scrollToKey(GlobalKey key) {
    final ctx = key.currentContext;
    if (ctx != null) {
      Scrollable.ensureVisible(
        ctx,
        duration: const Duration(milliseconds: 420),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void _copyCoupon(String code) {
    Clipboard.setData(ClipboardData(text: code));
    setState(() => _copiedCode = code);
    _showToast('Promo code $code copied');
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted && _copiedCode == code) {
        setState(() => _copiedCode = null);
      }
    });
  }

  void _onBottomNavTap(int index) {
    setState(() => _activeNavIndex = index);
    switch (index) {
      case 0:
        _scrollController.animateTo(
          0,
          duration: const Duration(milliseconds: 350),
          curve: Curves.easeOut,
        );
        break;
      case 1:
        _openCategoriesSheet();
        break;
      case 2:
        _openWishlistSheet();
        break;
      case 3:
        _openCartSheet();
        break;
      case 4:
        _openAccountSheet();
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final query = _searchQuery.trim().toLowerCase();
    final searchResults = query.isEmpty
        ? <ChinzoProduct>[]
        : _allProducts
            .where((p) =>
                p.title.toLowerCase().contains(query) ||
                p.category.toLowerCase().contains(query))
            .toList();

    final visibleCategories =
        kCategories.where((c) => c.group == _activeCategoryTab).toList();

    return Scaffold(
      backgroundColor: ChinzoColors.surface,
      body: Stack(
        children: [
          Column(
            children: [
              _buildHeader(),
              Expanded(
                child: SingleChildScrollView(
                  controller: _scrollController,
                  padding: const EdgeInsets.only(bottom: 100),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _buildSearchBarSection(),
                      if (query.isNotEmpty)
                        _buildSearchResults(searchResults)
                      else ...[
                        _buildHeroCarousel(),
                        const SizedBox(height: 18),
                        _buildQuickReasonsRow(),
                        const SizedBox(height: 20),
                        _buildShopByCategories(visibleCategories),
                        const SizedBox(height: 20),
                        _buildMegaDealsSection(),
                        const SizedBox(height: 20),
                        _buildLaptopDealsSection(),
                        const SizedBox(height: 20),
                        _buildCouponsSection(),
                        const SizedBox(height: 20),
                        _buildTopBrandsSection(),
                        const SizedBox(height: 20),
                        _buildInFocusBanner(),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _buildDarkBottomNav(),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      color: ChinzoColors.red,
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 6,
        left: 16,
        right: 12,
        bottom: 10,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Flexible(
            child: InkWell(
              onTap: _openLocationSheet,
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.black.withAlpha(41),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.location_on_outlined, color: Colors.white, size: 16),
                    const SizedBox(width: 6),
                    Flexible(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Deliver to',
                            style: TextStyle(
                              fontSize: 9.5,
                              color: Colors.white.withAlpha(209),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Flexible(
                                child: Text(
                                  _currentLocation.label,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 2),
                              const Icon(Icons.keyboard_arrow_down, color: Colors.white, size: 15),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Row(
            children: [
              Stack(
                children: [
                  IconButton(
                    onPressed: _openNotificationsSheet,
                    icon: const Icon(Icons.notifications_none_rounded, color: Colors.white, size: 22),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: ChinzoColors.gold,
                        shape: BoxShape.circle,
                        border: Border.all(color: ChinzoColors.red, width: 1.5),
                      ),
                    ),
                  ),
                ],
              ),
              Stack(
                children: [
                  IconButton(
                    onPressed: _openCartSheet,
                    icon: const Icon(Icons.shopping_cart_outlined, color: Colors.white, size: 22),
                  ),
                  if (_totalCartCount > 0)
                    Positioned(
                      top: 6,
                      right: 6,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '$_totalCartCount',
                          style: const TextStyle(
                            color: ChinzoColors.red,
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBarSection() {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            ChinzoColors.red,
            ChinzoColors.red.withAlpha(36),
            Colors.transparent,
          ],
        ),
      ),
      padding: const EdgeInsets.fromLTRB(16, 2, 16, 12),
      child: Container(
        height: 44,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: ChinzoColors.ink.withAlpha(20),
              blurRadius: 18,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12),
        child: Row(
          children: [
            const Icon(Icons.search_rounded, color: ChinzoColors.muted, size: 19),
            const SizedBox(width: 8),
            Expanded(
              child: TextField(
                controller: _searchController,
                onChanged: (v) => setState(() => _searchQuery = v),
                style: const TextStyle(fontSize: 13.5, color: ChinzoColors.ink),
                decoration: const InputDecoration(
                  hintText: 'Search for "iPhone 18 pro"',
                  hintStyle: TextStyle(fontSize: 13.5, color: Color(0xFF8E929E)),
                  border: InputBorder.none,
                  isDense: true,
                ),
              ),
            ),
            if (_searchQuery.isNotEmpty)
              GestureDetector(
                onTap: () {
                  _searchController.clear();
                  setState(() => _searchQuery = '');
                },
                child: const CircleAvatar(
                  radius: 13,
                  backgroundColor: Color(0xFFF4F4F5),
                  child: Icon(Icons.close, size: 14, color: ChinzoColors.ink),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchResults(List<ChinzoProduct> results) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Results for "$_searchQuery" (${results.length})',
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: ChinzoColors.ink),
              ),
              TextButton(
                onPressed: () {
                  _searchController.clear();
                  setState(() => _searchQuery = '');
                },
                child: const Text('Reset', style: TextStyle(color: ChinzoColors.red, fontWeight: FontWeight.w700)),
              ),
            ],
          ),
          if (results.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Column(
                children: [
                  Text('No matching items found', style: TextStyle(fontWeight: FontWeight.w700)),
                  SizedBox(height: 4),
                  Text(
                    'Try searching "MacBook", "Anker", "Xiaomi", or "Water".',
                    style: TextStyle(fontSize: 12, color: ChinzoColors.muted),
                  ),
                ],
              ),
            )
          else
            _buildProductGrid(results),
        ],
      ),
    );
  }

  Widget _buildHeroCarousel() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(22),
        child: SizedBox(
          height: 168,
          child: Stack(
            children: [
              PageView(
                controller: _heroController,
                onPageChanged: (idx) => setState(() => _heroIndex = idx),
                children: [
                  // Slide 1: Grand Opening Sale
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Color(0xFF45130C), Color(0xFF981D14), Color(0xFFC8883C)],
                      ),
                    ),
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        _assetImage('assets/chinzo/hero_panda.png', height: 144, fit: BoxFit.contain),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Column(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Text(
                                    'GRAND OPENING SALE',
                                    style: TextStyle(
                                      color: Color(0xFFFDE68A),
                                      fontSize: 10,
                                      fontWeight: FontWeight.w800,
                                      letterSpacing: 0.8,
                                    ),
                                  ),
                                  SizedBox(height: 2),
                                  Text(
                                    'Up to 70% OFF',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                  Text(
                                    'on Groceries & Electronics',
                                    style: TextStyle(color: Colors.white70, fontSize: 11),
                                  ),
                                ],
                              ),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: _assetImage('assets/chinzo/hero_thumbs.png', width: 175, fit: BoxFit.contain),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Slide 2: Big Wellness Savings
                  Container(
                    color: const Color(0xFFFF5254),
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text(
                                '20–31 OCTOBER',
                                style: TextStyle(color: Colors.white70, fontSize: 10.5, fontWeight: FontWeight.w700),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Big Wellness Savings',
                                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800),
                              ),
                              const SizedBox(height: 2),
                              const Text(
                                'Up to 50% off Sports Nutrition & Vitamins',
                                style: TextStyle(color: Color(0xFFFEF08A), fontSize: 11.5, fontWeight: FontWeight.w600),
                              ),
                              const SizedBox(height: 8),
                              ElevatedButton(
                                onPressed: () {
                                  setState(() => _activeCategoryTab = 'Wellness');
                                  _scrollToKey(_categoriesKey);
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.white,
                                  foregroundColor: ChinzoColors.red,
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                  minimumSize: Size.zero,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                                child: const Text('Shop Wellness', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800)),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          width: 68,
                          height: 92,
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                          child: _assetImage('assets/chinzo/wellness_protein.jpg', fit: BoxFit.contain),
                        ),
                      ],
                    ),
                  ),
                  // Slide 3: Bestsellers
                  Container(
                    color: const Color(0xFFFDF8E4),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        _assetImage('assets/chinzo/banner_bestsellers.jpg', fit: BoxFit.cover),
                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: ChinzoColors.red,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: const Text(
                                      'TOP RATED',
                                      style: TextStyle(color: Colors.white, fontSize: 9.5, fontWeight: FontWeight.w800),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Bestsellers',
                                    style: TextStyle(color: ChinzoColors.ink, fontSize: 20, fontWeight: FontWeight.w800),
                                  ),
                                  const Text(
                                    'Shop our top picks across Bahrain',
                                    style: TextStyle(color: ChinzoColors.muted, fontSize: 11.5),
                                  ),
                                ],
                              ),
                              ElevatedButton(
                                onPressed: () => _scrollToKey(_laptopDealsKey),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: ChinzoColors.ink,
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                  minimumSize: Size.zero,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                                child: const Text('Explore Picks', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Positioned(
                bottom: 8,
                left: 0,
                right: 0,
                child: Center(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withAlpha(77),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: List.generate(3, (idx) {
                        final active = idx == _heroIndex;
                        return AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          margin: const EdgeInsets.symmetric(horizontal: 2.5),
                          width: active ? 16 : 6,
                          height: 6,
                          decoration: BoxDecoration(
                            color: active ? Colors.white : Colors.white54,
                            borderRadius: BorderRadius.circular(4),
                          ),
                        );
                      }),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickReasonsRow() {
    final tiles = [
      ('Deals', 'assets/chinzo/deal_bag.png', _megaDealsKey),
      ('CHINZO Market', 'assets/chinzo/reason_market.jpg', _categoriesKey),
      ('Bestsellers', 'assets/chinzo/reason_bestsellers.jpg', _laptopDealsKey),
      ('Local Picks', 'assets/chinzo/reason_local.jpg', _topBrandsKey),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: tiles.asMap().entries.map((entry) {
          final idx = entry.key;
          final item = entry.value;
          return Expanded(
            child: Padding(
              padding: EdgeInsets.only(right: idx < 3 ? 10 : 0),
              child: GestureDetector(
                onTap: () => _scrollToKey(item.$3),
                child: Column(
                  children: [
                    AspectRatio(
                      aspectRatio: 1,
                      child: Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.black.withAlpha(13)),
                          boxShadow: [
                            BoxShadow(
                              color: ChinzoColors.ink.withAlpha(10),
                              blurRadius: 10,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: _assetImage(item.$2, fit: BoxFit.cover),
                        ),
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      item.$1,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: ChinzoColors.ink),
                    ),
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildShopByCategories(List<ChinzoCategory> categories) {
    return Column(
      key: _categoriesKey,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Shop by Categories',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
              ),
              GestureDetector(
                onTap: _openCategoriesSheet,
                child: const Text(
                  'See all',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w700, color: ChinzoColors.red),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: 34,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: kCategoryTabs.length,
            separatorBuilder: (_, __) => const SizedBox(width: 6),
            itemBuilder: (_, idx) {
              final tab = kCategoryTabs[idx];
              final isActive = tab == _activeCategoryTab;
              return GestureDetector(
                onTap: () => setState(() {
                  _activeCategoryTab = tab;
                  _selectedCategoryId = null;
                }),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                  decoration: BoxDecoration(
                    color: isActive ? ChinzoColors.ink : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: isActive ? null : Border.all(color: Colors.black.withAlpha(15)),
                  ),
                  child: Text(
                    tab,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: isActive ? Colors.white : const Color(0xFF52525B),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 122,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: categories.length,
            separatorBuilder: (_, __) => const SizedBox(width: 10),
            itemBuilder: (_, idx) {
              final cat = categories[idx];
              final isSelected = _selectedCategoryId == cat.id;
              return GestureDetector(
                onTap: () {
                  setState(() => _selectedCategoryId = isSelected ? null : cat.id);
                  _showToast('Browsing ${cat.name}');
                },
                child: SizedBox(
                  width: 86,
                  child: Column(
                    children: [
                      Container(
                        width: 86,
                        height: 88,
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? ChinzoColors.red : Colors.black.withAlpha(13),
                            width: isSelected ? 1.5 : 1,
                          ),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: _assetImage(cat.image, fit: BoxFit.cover),
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        cat.name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: ChinzoColors.ink),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMegaDealsSection() {
    return Padding(
      key: _megaDealsKey,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Text(
                    'Mega deals',
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFF27272A),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.access_time_rounded, size: 12, color: ChinzoColors.gold),
                        const SizedBox(width: 4),
                        Text(
                          _formattedCountdown,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10.5,
                            fontWeight: FontWeight.w700,
                            fontFeatures: [FontFeature.tabularFigures()],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () => _scrollToKey(_laptopDealsKey),
                child: const Text(
                  'See all',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w700, color: ChinzoColors.red),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildProductGrid(kMegaDeals),
        ],
      ),
    );
  }

  Widget _buildLaptopDealsSection() {
    return Padding(
      key: _laptopDealsKey,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Top deals in laptops',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
              ),
              GestureDetector(
                onTap: _openCategoriesSheet,
                child: const Text(
                  'See all',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w700, color: ChinzoColors.red),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildProductGrid(kLaptopDeals),
        ],
      ),
    );
  }

  Widget _buildCouponsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Maximize your savings',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
              ),
              Text(
                'Tap to copy',
                style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w600, color: ChinzoColors.muted),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 186,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: kCoupons.length,
            separatorBuilder: (_, __) => const SizedBox(width: 12),
            itemBuilder: (_, idx) {
              final coupon = kCoupons[idx];
              final isCopied = _copiedCode == coupon.code;
              return GestureDetector(
                onTap: () => _copyCoupon(coupon.code),
                child: Container(
                  width: 215,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.black.withAlpha(13)),
                    boxShadow: [
                      BoxShadow(
                        color: ChinzoColors.ink.withAlpha(10),
                        blurRadius: 10,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: Column(
                    children: [
                      SizedBox(
                        height: 114,
                        width: double.infinity,
                        child: _assetImage(coupon.image, fit: BoxFit.cover),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    coupon.headline,
                                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
                                  ),
                                  Text(
                                    coupon.subline,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontSize: 11, color: ChinzoColors.muted),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 6),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                              decoration: BoxDecoration(
                                color: isCopied ? ChinzoColors.green : const Color(0xFFFFF5F5),
                                borderRadius: BorderRadius.circular(8),
                                border: isCopied
                                    ? null
                                    : Border.all(color: ChinzoColors.red.withAlpha(51)),
                              ),
                              child: Text(
                                isCopied ? 'Copied' : coupon.code,
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w800,
                                  color: isCopied ? Colors.white : ChinzoColors.red,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildTopBrandsSection() {
    return Padding(
      key: _topBrandsKey,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Lowest prices on top brands',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: ChinzoColors.ink),
              ),
              GestureDetector(
                onTap: _openCategoriesSheet,
                child: const Text(
                  'See all',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w700, color: ChinzoColors.red),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildProductGrid(kTopBrandDeals),
        ],
      ),
    );
  }

  Widget _buildInFocusBanner() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: SizedBox(
          height: 120,
          child: Stack(
            fit: StackFit.expand,
            children: [
              _assetImage('assets/chinzo/in_focus_food.jpg', fit: BoxFit.cover),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [
                      Colors.black.withAlpha(199),
                      Colors.black.withAlpha(71),
                      Colors.transparent,
                    ],
                  ),
                ),
                padding: const EdgeInsets.all(14),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'IN FOCUS · MANAMA',
                      style: TextStyle(
                        color: Color(0xFFFDE68A),
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.7,
                      ),
                    ),
                    SizedBox(height: 2),
                    Text(
                      'CHINZO Market Essentials',
                      style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w800),
                    ),
                    Text(
                      'Authentic goods, pantry staples & 1-hour Bahrain delivery',
                      style: TextStyle(color: Colors.white70, fontSize: 11),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProductGrid(List<ChinzoProduct> products) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: products.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
        childAspectRatio: 0.59,
      ),
      itemBuilder: (_, idx) => _buildProductCard(products[idx]),
    );
  }

  Widget _buildProductCard(ChinzoProduct product) {
    final isWishlisted = _wishlistIds.contains(product.id);
    final qty = _cart[product.id] ?? 0;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black.withAlpha(13)),
        boxShadow: [
          BoxShadow(
            color: ChinzoColors.ink.withAlpha(10),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 52,
            child: Container(
              width: double.infinity,
              color: ChinzoColors.cardBg,
              padding: const EdgeInsets.all(10),
              child: Stack(
                children: [
                  Center(child: _assetImage(product.image, fit: BoxFit.contain)),
                  if (product.badge != null)
                    Positioned(
                      top: 0,
                      left: 0,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                        decoration: BoxDecoration(
                          color: product.isKicker
                              ? ChinzoColors.red
                              : (product.badge == 'Best Seller' ? const Color(0xFF1F2430) : const Color(0xFF7A1B47)),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          product.badge!,
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700),
                        ),
                      ),
                    ),
                  Positioned(
                    top: -2,
                    right: -2,
                    child: GestureDetector(
                      onTap: () => _toggleWishlist(product.id),
                      child: Container(
                        width: 28,
                        height: 28,
                        decoration: BoxDecoration(
                          color: Colors.white.withAlpha(242),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(color: Colors.black.withAlpha(20), blurRadius: 4),
                          ],
                        ),
                        child: Icon(
                          isWishlisted ? Icons.favorite : Icons.favorite_border,
                          size: 15,
                          color: isWishlisted ? ChinzoColors.red : const Color(0xFF52525B),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: qty == 0
                        ? GestureDetector(
                            onTap: () => _addToCart(product.id),
                            child: Container(
                              width: 34,
                              height: 34,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10),
                                boxShadow: [
                                  BoxShadow(color: Colors.black.withAlpha(31), blurRadius: 8),
                                ],
                              ),
                              child: const Icon(Icons.add, size: 18, color: ChinzoColors.ink),
                            ),
                          )
                        : Container(
                            height: 30,
                            padding: const EdgeInsets.symmetric(horizontal: 6),
                            decoration: BoxDecoration(
                              color: ChinzoColors.ink,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                GestureDetector(
                                  onTap: () => _decrementCart(product.id),
                                  child: const Icon(Icons.remove, size: 14, color: Colors.white),
                                ),
                                Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 6),
                                  child: Text(
                                    '$qty',
                                    style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                                  ),
                                ),
                                GestureDetector(
                                  onTap: () => _addToCart(product.id),
                                  child: const Icon(Icons.add, size: 14, color: Colors.white),
                                ),
                              ],
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 48,
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        product.title,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12,
                          height: 1.3,
                          fontWeight: FontWeight.w600,
                          color: ChinzoColors.ink,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.star_rounded, size: 13, color: ChinzoColors.green),
                          const SizedBox(width: 2),
                          Text(
                            product.rating,
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: ChinzoColors.ink),
                          ),
                          Text(
                            ' (${product.reviews})',
                            style: const TextStyle(fontSize: 11, color: ChinzoColors.muted),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Wrap(
                        spacing: 5,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          Text(
                            product.priceBD,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w800,
                              color: ChinzoColors.ink,
                              fontFeatures: [FontFeature.tabularFigures()],
                            ),
                          ),
                          if (product.originalPrice != null)
                            Text(
                              product.originalPrice!,
                              style: const TextStyle(
                                fontSize: 10.5,
                                color: Color(0xFF8E929E),
                                decoration: TextDecoration.lineThrough,
                              ),
                            ),
                          if (product.discountPercent != null)
                            Text(
                              '${product.discountPercent}% OFF',
                              style: const TextStyle(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w700,
                                color: ChinzoColors.green,
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      if (product.isInstant)
                        Row(
                          children: [
                            const Icon(Icons.bolt_rounded, size: 13, color: ChinzoColors.red),
                            const SizedBox(width: 2),
                            Flexible(
                              child: Text(
                                product.deliveryLabel,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.w700,
                                  color: ChinzoColors.red,
                                ),
                              ),
                            ),
                          ],
                        )
                      else
                        const Text.rich(
                          TextSpan(
                            children: [
                              TextSpan(
                                text: 'express ',
                                style: TextStyle(
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.w800,
                                  fontStyle: FontStyle.italic,
                                  color: ChinzoColors.red,
                                ),
                              ),
                              TextSpan(
                                text: 'Tomorrow',
                                style: TextStyle(
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.w600,
                                  color: ChinzoColors.ink,
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDarkBottomNav() {
    final items = [
      (Icons.home_rounded, 'Home', 0),
      (Icons.grid_view_rounded, 'Categories', 0),
      (Icons.favorite_border_rounded, 'Wishlist', _wishlistIds.length),
      (Icons.shopping_cart_outlined, 'Cart', _totalCartCount),
      (Icons.person_outline_rounded, 'Account', 0),
    ];

    return Container(
      decoration: const BoxDecoration(
        color: ChinzoColors.darkDock,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        boxShadow: [
          BoxShadow(color: Colors.black26, blurRadius: 24, offset: Offset(0, -6)),
        ],
      ),
      padding: EdgeInsets.only(
        top: 8,
        bottom: MediaQuery.of(context).padding.bottom + 8,
        left: 8,
        right: 8,
      ),
      child: Row(
        children: items.asMap().entries.map((entry) {
          final idx = entry.key;
          final item = entry.value;
          final isActive = idx == _activeNavIndex;
          return Expanded(
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () => _onBottomNavTap(idx),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 180),
                    width: isActive ? 28 : 0,
                    height: 3,
                    margin: const EdgeInsets.only(bottom: 6),
                    decoration: BoxDecoration(
                      color: ChinzoColors.red,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  Stack(
                    clipBehavior: Clip.none,
                    children: [
                      Icon(
                        item.$1,
                        size: 21,
                        color: isActive ? ChinzoColors.redBright : const Color(0xFFA1A1AA),
                      ),
                      if (item.$3 > 0)
                        Positioned(
                          top: -5,
                          right: -8,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                            decoration: BoxDecoration(
                              color: ChinzoColors.red,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: ChinzoColors.darkDock, width: 1.5),
                            ),
                            child: Text(
                              '${item.$3}',
                              style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w800),
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    item.$2,
                    style: TextStyle(
                      fontSize: 10.5,
                      fontWeight: isActive ? FontWeight.w700 : FontWeight.w500,
                      color: isActive ? Colors.white : const Color(0xFFA1A1AA),
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _assetImage(String path, {double? width, double? height, BoxFit fit = BoxFit.cover}) {
    return Image.asset(
      path,
      width: width,
      height: height,
      fit: fit,
      errorBuilder: (_, __, ___) => Container(
        width: width,
        height: height,
        color: const Color(0xFFEEEEF2),
        alignment: Alignment.center,
        child: const Icon(Icons.shopping_bag_outlined, color: ChinzoColors.muted, size: 22),
      ),
    );
  }

  void _openLocationSheet() {
    _showChinzoSheet(
      title: 'Delivery Location',
      child: Column(
        children: kLocations.map((loc) {
          final isSelected = loc.id == _selectedLocationId;
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: ListTile(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: BorderSide(color: isSelected ? ChinzoColors.red : const Color(0xFFE4E4E7)),
              ),
              tileColor: isSelected ? const Color(0xFFFFF5F5) : Colors.white,
              leading: Icon(Icons.location_on_outlined, color: isSelected ? ChinzoColors.red : ChinzoColors.muted),
              title: Text(loc.label, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w700)),
              subtitle: Text('${loc.detail} · ${loc.eta}', style: const TextStyle(fontSize: 12)),
              trailing: isSelected ? const Icon(Icons.check, color: ChinzoColors.red) : null,
              onTap: () {
                setState(() => _selectedLocationId = loc.id);
                Navigator.pop(context);
                _showToast('Delivery set to ${loc.label}');
              },
            ),
          );
        }).toList(),
      ),
    );
  }

  void _openNotificationsSheet() {
    final notes = [
      ('Grand Opening Sale: Up to 70% OFF', 'Save across Groceries, Electronics & Home Care in Manama.', 'Active now'),
      ('Mega Deals Timer Running', 'Xiaomi REDMI Note 17 Pro Max at 10.200 BD & Acer Aspire Lite at 3.500 BD.', '14h 37m left'),
      ('Extra Coupon Codes Unlocked', 'Use APPLIANCE10, CAMERAS20, or SAVE10 at checkout.', 'Today'),
    ];
    _showChinzoSheet(
      title: 'Chinzo Alerts & Offers',
      child: Column(
        children: notes
            .map(
              (n) => Container(
                margin: const EdgeInsets.only(bottom: 10),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(color: ChinzoColors.cardBg, borderRadius: BorderRadius.circular(16)),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(color: const Color(0xFFFEE2E2), borderRadius: BorderRadius.circular(10)),
                      child: const Icon(Icons.notifications_none, color: ChinzoColors.red, size: 18),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(n.$1, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                          const SizedBox(height: 2),
                          Text(n.$2, style: const TextStyle(fontSize: 12, color: ChinzoColors.muted)),
                          const SizedBox(height: 4),
                          Text(n.$3, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: ChinzoColors.red)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  void _openCategoriesSheet() {
    _showChinzoSheet(
      title: 'All Chinzo Categories',
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: kDepartments.length,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 10,
          crossAxisSpacing: 10,
          childAspectRatio: 3.1,
        ),
        itemBuilder: (_, idx) {
          final dept = kDepartments[idx];
          return InkWell(
            onTap: () {
              Navigator.pop(context);
              setState(() {
                if (dept.contains('Kids')) {
                  _activeCategoryTab = "Kids' Fashion";
                } else if (dept.contains('Grocery')) {
                  _activeCategoryTab = 'Grocery';
                } else if (dept.contains('Books')) {
                  _activeCategoryTab = 'Books & Media';
                } else if (dept.contains('Health')) {
                  _activeCategoryTab = 'Wellness';
                } else {
                  _activeCategoryTab = 'Featured';
                }
              });
              _scrollToKey(_categoriesKey);
              _showToast('Showing $dept');
            },
            borderRadius: BorderRadius.circular(12),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              alignment: Alignment.centerLeft,
              decoration: BoxDecoration(
                color: ChinzoColors.cardBg,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFF4F4F5)),
              ),
              child: Text(dept, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
            ),
          );
        },
      ),
    );
  }

  void _openWishlistSheet() {
    final items = _allProducts.where((p) => _wishlistIds.contains(p.id)).toList();
    _showChinzoSheet(
      title: 'Saved Wishlist (${items.length})',
      child: items.isEmpty
          ? const Padding(
              padding: EdgeInsets.symmetric(vertical: 28),
              child: Column(
                children: [
                  Icon(Icons.favorite_border, color: ChinzoColors.red, size: 32),
                  SizedBox(height: 8),
                  Text('No saved favorites yet', style: TextStyle(fontWeight: FontWeight.w700)),
                ],
              ),
            )
          : Column(
              children: items
                  .map(
                    (p) => ListTile(
                      contentPadding: const EdgeInsets.symmetric(vertical: 4),
                      leading: SizedBox(width: 48, height: 48, child: _assetImage(p.image, fit: BoxFit.contain)),
                      title: Text(p.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
                      subtitle: Text(p.priceBD, style: const TextStyle(fontWeight: FontWeight.w800, color: ChinzoColors.ink)),
                      trailing: ElevatedButton(
                        onPressed: () => _addToCart(p.id),
                        style: ElevatedButton.styleFrom(backgroundColor: ChinzoColors.red, foregroundColor: Colors.white),
                        child: const Text('Add', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w700)),
                      ),
                    ),
                  )
                  .toList(),
            ),
    );
  }

  void _openCartSheet() {
    final entries = _cart.entries.where((e) => e.value > 0).toList();
    double subtotal = 0;
    for (final e in entries) {
      final prod = _allProducts.firstWhere((p) => p.id == e.key);
      subtotal += prod.priceNum * e.value;
    }

    _showChinzoSheet(
      title: 'Your Cart ($_totalCartCount)',
      child: entries.isEmpty
          ? const Padding(
              padding: EdgeInsets.symmetric(vertical: 28),
              child: Column(
                children: [
                  Icon(Icons.shopping_bag_outlined, color: ChinzoColors.red, size: 32),
                  SizedBox(height: 8),
                  Text('Your Chinzo cart is empty', style: TextStyle(fontWeight: FontWeight.w700)),
                ],
              ),
            )
          : Column(
              children: [
                ...entries.map((e) {
                  final prod = _allProducts.firstWhere((p) => p.id == e.key);
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: SizedBox(width: 48, height: 48, child: _assetImage(prod.image, fit: BoxFit.contain)),
                    title: Text(prod.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
                    subtitle: Text('${prod.priceBD} × ${e.value}', style: const TextStyle(color: ChinzoColors.red, fontWeight: FontWeight.w700)),
                  );
                }),
                const Divider(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Subtotal (Free delivery over 10 BD)', style: TextStyle(fontSize: 11.5, color: ChinzoColors.muted)),
                        Text('${subtotal.toStringAsFixed(3)} BD', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800)),
                      ],
                    ),
                    ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      style: ElevatedButton.styleFrom(backgroundColor: ChinzoColors.red, foregroundColor: Colors.white),
                      child: const Text('Continue'),
                    ),
                  ],
                ),
              ],
            ),
    );
  }

  void _openAccountSheet() {
    _showChinzoSheet(
      title: 'Chinzo Account',
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFFFFF5F5),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: ChinzoColors.red.withAlpha(38)),
        ),
        child: const Row(
          children: [
            CircleAvatar(
              radius: 22,
              backgroundColor: ChinzoColors.red,
              child: Icon(Icons.person_outline, color: Colors.white),
            ),
            SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Chinzo Shopper · Manama', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                  Text('Free delivery unlocked with Chinzo Bahrain', style: TextStyle(fontSize: 12, color: ChinzoColors.muted)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showChinzoSheet({required String title, required Widget child}) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (_) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(color: const Color(0xFFD4D4D8), borderRadius: BorderRadius.circular(2)),
                  ),
                ),
                const SizedBox(height: 14),
                Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
                const SizedBox(height: 12),
                child,
              ],
            ),
          ),
        ),
      ),
    ).whenComplete(() {
      if (mounted) setState(() => _activeNavIndex = 0);
    });
  }
}

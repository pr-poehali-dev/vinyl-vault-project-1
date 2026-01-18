import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Vinyl {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  condition: string;
  price: number;
  image: string;
}

const vinylData: Vinyl[] = [
  { id: 1, title: "Dark Side of the Moon", artist: "Pink Floyd", year: 1973, genre: "Progressive Rock", condition: "Mint", price: 4500, image: "🌙" },
  { id: 2, title: "Rumours", artist: "Fleetwood Mac", year: 1977, genre: "Rock", condition: "Near Mint", price: 3800, image: "💿" },
  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982, genre: "Pop", condition: "Very Good", price: 5200, image: "🎵" },
  { id: 4, title: "Led Zeppelin IV", artist: "Led Zeppelin", year: 1971, genre: "Hard Rock", condition: "Mint", price: 4200, image: "⚡" },
  { id: 5, title: "Abbey Road", artist: "The Beatles", year: 1969, genre: "Rock", condition: "Near Mint", price: 6000, image: "🚶" },
  { id: 6, title: "The Wall", artist: "Pink Floyd", year: 1979, genre: "Progressive Rock", condition: "Very Good", price: 3500, image: "🧱" },
  { id: 7, title: "Kind of Blue", artist: "Miles Davis", year: 1959, genre: "Jazz", condition: "Good", price: 4800, image: "🎺" },
  { id: 8, title: "Nevermind", artist: "Nirvana", year: 1991, genre: "Grunge", condition: "Mint", price: 3200, image: "🎸" },
];

export default function Index() {
  const [cart, setCart] = useState<Vinyl[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [currentSection, setCurrentSection] = useState<string>("home");

  const genres = ["all", ...Array.from(new Set(vinylData.map(v => v.genre)))];
  const conditions = ["all", ...Array.from(new Set(vinylData.map(v => v.condition)))];
  const years = ["all", ...Array.from(new Set(vinylData.map(v => v.year.toString())))];

  const filteredVinyls = vinylData.filter(vinyl => {
    const genreMatch = selectedGenre === "all" || vinyl.genre === selectedGenre;
    const conditionMatch = selectedCondition === "all" || vinyl.condition === selectedCondition;
    const yearMatch = selectedYear === "all" || vinyl.year.toString() === selectedYear;
    return genreMatch && conditionMatch && yearMatch;
  });

  const addToCart = (vinyl: Vinyl) => {
    setCart([...cart, vinyl]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background vintage-texture">
      <header className="border-b-4 border-secondary bg-card sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-3xl vinyl-spin">
                💿
              </div>
              <div>
                <h1 className="text-4xl text-secondary font-heading">Vinyl Vault</h1>
                <p className="text-xs text-muted-foreground">Est. 1975</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {["Главная", "Каталог", "О нас", "Доставка", "Контакты"].map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrentSection(item.toLowerCase())}
                  className="text-lg hover:text-primary transition-colors font-semibold tracking-wide"
                >
                  {item}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative border-2 border-secondary">
                  <Icon name="ShoppingCart" size={24} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary">{cart.length}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-3xl font-heading">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-4">
                          <div className="flex-1">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.artist}</p>
                            <p className="text-primary font-bold">{item.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(index)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t-2 pt-4">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-lg py-6">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {(currentSection === "главная" || currentSection === "home") && (
        <section className="relative bg-gradient-to-br from-secondary via-primary to-accent py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-7xl md:text-9xl text-white mb-6 drop-shadow-lg font-heading">
              Коллекция винтажных пластинок
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
              Откройте для себя легендарные альбомы 60-х, 70-х и 80-х годов
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentSection("каталог")}
              className="bg-white text-secondary hover:bg-white/90 text-xl py-6 px-12 shadow-2xl"
            >
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        </section>
      )}

      {currentSection === "каталог" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-6xl text-center mb-12 text-secondary font-heading">Каталог</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Жанр</label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "all" ? "Все жанры" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Состояние</label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>
                      {condition === "all" ? "Любое" : condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Год выпуска</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "Все годы" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVinyls.map((vinyl) => (
              <Card key={vinyl.id} className="border-2 border-secondary hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="text-8xl mb-4 text-center">{vinyl.image}</div>
                  <h3 className="text-2xl mb-2 text-secondary font-heading">{vinyl.title}</h3>
                  <p className="text-muted-foreground mb-1">{vinyl.artist}</p>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <Badge variant="secondary">{vinyl.genre}</Badge>
                    <Badge variant="outline">{vinyl.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Состояние: <span className="font-semibold">{vinyl.condition}</span>
                  </p>
                  <p className="text-3xl font-bold text-primary mb-4">{vinyl.price} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => addToCart(vinyl)}
                    className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6"
                  >
                    <Icon name="ShoppingCart" className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {currentSection === "о нас" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-6xl text-center mb-12 text-secondary font-heading">О нас</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Vinyl Vault — это больше, чем просто магазин. Мы храним музыкальную историю с 1975 года.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Наша коллекция включает редкие и культовые альбомы, которые определили целые поколения. 
              Каждая пластинка тщательно отобрана и проверена нашими экспертами.
            </p>
            <p className="text-lg leading-relaxed">
              Мы верим, что винил — это не просто носитель музыки, а способ прикоснуться к истории.
            </p>
          </div>
        </section>
      )}

      {currentSection === "доставка" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-6xl text-center mb-12 text-secondary font-heading">Доставка</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl mb-2 font-heading">По Москве</h3>
              <p className="text-muted-foreground">Курьерская доставка 1-2 дня — 500 ₽</p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl mb-2 font-heading">По России</h3>
              <p className="text-muted-foreground">СДЭК, Почта России — от 600 ₽</p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl mb-2 font-heading">Самовывоз</h3>
              <p className="text-muted-foreground">Бесплатно из нашего шоурума</p>
            </div>
          </div>
        </section>
      )}

      {currentSection === "контакты" && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-6xl text-center mb-12 text-secondary font-heading">Контакты</h2>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div>
              <Icon name="MapPin" className="inline-block mb-2" size={32} />
              <p className="text-xl">Москва, ул. Винильная, д. 33</p>
            </div>
            <div>
              <Icon name="Phone" className="inline-block mb-2" size={32} />
              <p className="text-xl">+7 (495) 123-45-67</p>
            </div>
            <div>
              <Icon name="Mail" className="inline-block mb-2" size={32} />
              <p className="text-xl">info@vinylvault.ru</p>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary text-white py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-2xl">
              💿
            </div>
            <h3 className="text-3xl font-heading">Vinyl Vault</h3>
          </div>
          <p className="text-white/70">© 1975-2026 Vinyl Vault. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
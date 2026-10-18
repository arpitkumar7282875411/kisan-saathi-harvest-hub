CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  location text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  content text NOT NULL,
  likes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.market_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_name text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  crop text NOT NULL,
  quantity text NOT NULL,
  price text NOT NULL,
  listing_type text NOT NULL DEFAULT 'sell',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.community_posts TO anon, authenticated;
GRANT SELECT, INSERT ON public.market_listings TO anon, authenticated;
GRANT ALL ON public.community_posts TO service_role;
GRANT ALL ON public.market_listings TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Public create posts" ON public.community_posts FOR INSERT WITH CHECK (char_length(content) BETWEEN 1 AND 2000 AND char_length(author_name) BETWEEN 1 AND 80);
CREATE POLICY "Public read listings" ON public.market_listings FOR SELECT USING (true);
CREATE POLICY "Public create listings" ON public.market_listings FOR INSERT WITH CHECK (char_length(seller_name) BETWEEN 1 AND 80 AND char_length(phone) BETWEEN 6 AND 20);

INSERT INTO public.community_posts (author_name, location, category, content, likes) VALUES
('Ramesh Patel','Anand, Gujarat','Crops','My wheat leaves are turning yellow at the tips. Used urea last week. Anyone faced this? Is it nitrogen or rust?',12),
('Sukhwinder Singh','Ludhiana, Punjab','Irrigation','Switched to drip irrigation for my vegetables this year — saved almost 40% water and the yield is better. Happy to guide anyone.',34),
('Lakshmi Devi','Guntur, Andhra Pradesh','Market','Chilli prices at Guntur mandi are good this week, around ₹18,000/quintal for Teja variety.',21),
('Anil Yadav','Varanasi, UP','Schemes','PM-KISAN installment came yesterday. Check your e-KYC is complete otherwise money gets stuck.',45);

INSERT INTO public.market_listings (seller_name, phone, location, crop, quantity, price, listing_type) VALUES
('Mahesh Jadhav','9876543210','Nashik, Maharashtra','Onion','50 quintal','₹2,200 / quintal','sell'),
('Gurpreet Kaur','9812345678','Bathinda, Punjab','Wheat','100 quintal','₹2,425 / quintal','sell'),
('Agro Fresh Traders','9898989898','Indore, MP','Soybean','Need 200 quintal','₹4,900 / quintal','buy'),
('Kavita Reddy','9700012345','Kurnool, AP','Tomato','20 quintal','₹1,500 / quintal','sell');
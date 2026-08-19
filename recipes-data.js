const RECIPES = [
  {
    id: 1,
    name: "Hummus",
    nameAr: "حمص",
    category: "meze",
    time: 15,
    servings: 6,
    difficulty: "easy",
    image: "🫘",
    description: "Creamy chickpea dip with tahini, lemon juice, and garlic — the cornerstone of Lebanese meze.",
    ingredients: [
      { item: "chickpeas", amount: "400g canned or cooked" },
      { item: "tahini", amount: "3 tbsp" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "garlic", amount: "2 cloves" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "cumin", amount: "½ tsp" },
      { item: "water", amount: "2-4 tbsp" },
      { item: "paprika", amount: "for garnish" }
    ],
    steps: [
      "Drain chickpeas, reserving some liquid.",
      "Blend chickpeas, tahini, lemon juice, garlic, and cumin until very smooth.",
      "Add water gradually until you reach desired consistency.",
      "Season with salt. Blend 2 more minutes for extra creaminess.",
      "Serve on a plate, drizzle with olive oil and sprinkle paprika."
    ],
    tags: ["vegan", "gluten-free", "dip", "cold"]
  },
  {
    id: 2,
    name: "Baba Ghanouj",
    nameAr: "بابا غنوج",
    category: "meze",
    time: 40,
    servings: 4,
    difficulty: "easy",
    image: "🍆",
    description: "Smoky roasted eggplant dip with tahini and lemon — best when eggplant is charred directly over flame.",
    ingredients: [
      { item: "eggplant", amount: "2 large" },
      { item: "tahini", amount: "2 tbsp" },
      { item: "lemon juice", amount: "2 tbsp" },
      { item: "garlic", amount: "1 clove" },
      { item: "olive oil", amount: "1 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "parsley", amount: "handful, chopped" }
    ],
    steps: [
      "Char eggplants directly over gas flame or under broiler, turning every 5 min, until completely soft and blackened (20 min).",
      "Let cool, then peel and discard charred skin.",
      "Squeeze out excess moisture from eggplant flesh.",
      "Mash or blend with tahini, lemon juice, garlic, and salt.",
      "Drizzle with olive oil and garnish with parsley."
    ],
    tags: ["vegan", "gluten-free", "dip", "smoky"]
  },
  {
    id: 3,
    name: "Tabbouleh",
    nameAr: "تبولة",
    category: "salad",
    time: 20,
    servings: 4,
    difficulty: "easy",
    image: "🌿",
    description: "The iconic Lebanese herb salad — mostly parsley, not bulgur. Fresh, bright, and lemony.",
    ingredients: [
      { item: "parsley", amount: "3 large bunches (flat-leaf)" },
      { item: "mint", amount: "½ bunch fresh" },
      { item: "tomatoes", amount: "3 medium, finely diced" },
      { item: "green onions", amount: "4-5 stalks" },
      { item: "bulgur wheat", amount: "2 tbsp fine (#1)" },
      { item: "lemon juice", amount: "¼ cup" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "allspice", amount: "¼ tsp (optional)" }
    ],
    steps: [
      "Soak bulgur in lemon juice for 15 min — it softens without cooking.",
      "Finely chop parsley and mint (remove thick stems).",
      "Dice tomatoes very small; chop green onions.",
      "Combine everything, add olive oil and remaining lemon juice.",
      "Season with salt and allspice. Toss and serve immediately."
    ],
    tags: ["vegan", "salad", "fresh", "cold"]
  },
  {
    id: 4,
    name: "Fattoush",
    nameAr: "فتوش",
    category: "salad",
    time: 20,
    servings: 4,
    difficulty: "easy",
    image: "🥗",
    description: "Crunchy Lebanese bread salad with toasted pita, vegetables, and tangy sumac dressing.",
    ingredients: [
      { item: "pita bread", amount: "2 rounds" },
      { item: "romaine lettuce", amount: "1 head" },
      { item: "tomatoes", amount: "2 medium" },
      { item: "cucumber", amount: "1 medium" },
      { item: "radishes", amount: "4-5" },
      { item: "green onions", amount: "3 stalks" },
      { item: "mint", amount: "handful fresh" },
      { item: "parsley", amount: "handful fresh" },
      { item: "sumac", amount: "1½ tsp" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "garlic", amount: "1 clove, minced" },
      { item: "salt", amount: "to taste" }
    ],
    steps: [
      "Toast or fry pita pieces until golden and crunchy.",
      "Chop all vegetables into bite-sized pieces.",
      "Whisk together lemon juice, olive oil, garlic, sumac, and salt.",
      "Toss vegetables with dressing.",
      "Add pita chips just before serving so they stay crunchy."
    ],
    tags: ["vegan", "salad", "crunchy", "bread"]
  },
  {
    id: 5,
    name: "Kibbeh",
    nameAr: "كبة",
    category: "main",
    time: 60,
    servings: 6,
    difficulty: "medium",
    image: "🥩",
    description: "Lebanon's national dish — bulgur and lamb shells stuffed with spiced meat and pine nuts.",
    ingredients: [
      { item: "ground lamb", amount: "500g (or beef)" },
      { item: "bulgur wheat", amount: "1 cup fine (#1)" },
      { item: "onion", amount: "1 large" },
      { item: "pine nuts", amount: "3 tbsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "cumin", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "black pepper", amount: "to taste" },
      { item: "vegetable oil", amount: "for frying" }
    ],
    steps: [
      "Soak bulgur in cold water 15 min, drain and squeeze dry.",
      "Make outer shell: blend bulgur, half the onion, 250g lamb, allspice, salt — mixture should hold together.",
      "Make filling: sauté remaining onion, add 250g lamb, pine nuts, cinnamon, cumin. Cook through.",
      "Wet hands, take golf-ball of shell mixture, hollow it out, fill with lamb mixture, seal into football shape.",
      "Fry in hot oil at 180°C for 4-5 min until deep brown.",
      "Serve with yogurt or mint salad."
    ],
    tags: ["meat", "lamb", "fried", "festive"]
  },
  {
    id: 6,
    name: "Kafta",
    nameAr: "كفتة",
    category: "main",
    time: 25,
    servings: 4,
    difficulty: "easy",
    image: "🍢",
    description: "Spiced ground meat skewers grilled over charcoal — Lebanese BBQ at its finest.",
    ingredients: [
      { item: "ground beef", amount: "500g (or lamb)" },
      { item: "onion", amount: "1 medium, grated" },
      { item: "parsley", amount: "¼ cup fresh, chopped" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "cumin", amount: "½ tsp" },
      { item: "black pepper", amount: "½ tsp" },
      { item: "salt", amount: "1 tsp" }
    ],
    steps: [
      "Combine all ingredients and mix well for 2-3 minutes — this is key for binding.",
      "Refrigerate 30 min (optional but recommended).",
      "Shape onto flat metal skewers, pressing firmly.",
      "Grill over high heat 3-4 min per side.",
      "Serve with pita, tomatoes, and garlic sauce."
    ],
    tags: ["meat", "grilled", "BBQ", "quick"]
  },
  {
    id: 7,
    name: "Shish Taouk",
    nameAr: "شيش طاووق",
    category: "main",
    time: 35,
    servings: 4,
    difficulty: "easy",
    image: "🍗",
    description: "Marinated chicken skewers with yogurt, garlic and lemon — a Lebanese favorite.",
    ingredients: [
      { item: "chicken breast", amount: "700g, cubed" },
      { item: "yogurt", amount: "3 tbsp plain" },
      { item: "tomato paste", amount: "1 tbsp" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "garlic", amount: "4 cloves, minced" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "allspice", amount: "1 tsp" },
      { item: "paprika", amount: "1 tsp" },
      { item: "cumin", amount: "½ tsp" },
      { item: "cinnamon", amount: "¼ tsp" },
      { item: "salt", amount: "1 tsp" },
      { item: "black pepper", amount: "½ tsp" }
    ],
    steps: [
      "Combine all marinade ingredients.",
      "Coat chicken cubes well, cover and marinate at least 2 hours (overnight is best).",
      "Thread onto skewers.",
      "Grill or broil on high heat 4-5 min per side until cooked through with charred edges.",
      "Serve with garlic sauce (toum), pita, and pickles."
    ],
    tags: ["chicken", "grilled", "marinated"]
  },
  {
    id: 8,
    name: "Falafel",
    nameAr: "فلافل",
    category: "meze",
    time: 30,
    servings: 4,
    difficulty: "medium",
    image: "🧆",
    description: "Crispy, herb-loaded chickpea fritters. Made right, they're light and green inside.",
    ingredients: [
      { item: "chickpeas", amount: "400g dried (soaked overnight, NOT canned)" },
      { item: "parsley", amount: "1 cup fresh" },
      { item: "cilantro", amount: "½ cup fresh (optional)" },
      { item: "onion", amount: "1 medium" },
      { item: "garlic", amount: "4 cloves" },
      { item: "cumin", amount: "1 tsp" },
      { item: "coriander", amount: "1 tsp ground" },
      { item: "salt", amount: "1 tsp" },
      { item: "baking soda", amount: "½ tsp" },
      { item: "vegetable oil", amount: "for frying" }
    ],
    steps: [
      "Use RAW soaked chickpeas — canned will fall apart.",
      "Blend chickpeas, onion, herbs, garlic, spices until finely ground but not a paste. Refrigerate 1 hour.",
      "Add baking soda and mix. Form into small patties or balls.",
      "Fry in oil at 175°C for 3-4 min until deep brown.",
      "Serve immediately — they lose crispness fast."
    ],
    tags: ["vegan", "fried", "street food", "chickpeas"]
  },
  {
    id: 9,
    name: "Manakish Zaatar",
    nameAr: "مناقيش زعتر",
    category: "breakfast",
    time: 30,
    servings: 4,
    difficulty: "easy",
    image: "🫓",
    description: "The Lebanese breakfast flatbread — za'atar paste baked on chewy dough.",
    ingredients: [
      { item: "flour", amount: "2 cups" },
      { item: "yeast", amount: "1 tsp instant" },
      { item: "water", amount: "¾ cup warm" },
      { item: "salt", amount: "½ tsp" },
      { item: "sugar", amount: "1 tsp" },
      { item: "olive oil", amount: "3 tbsp (dough) + 3 tbsp (topping)" },
      { item: "zaatar spice mix", amount: "3 tbsp" }
    ],
    steps: [
      "Mix flour, yeast, sugar, salt. Add water and 3 tbsp oil. Knead 8 min until smooth.",
      "Rest covered 45 min until doubled.",
      "Mix za'atar with 3 tbsp olive oil to make a paste.",
      "Divide dough into 4 balls, roll thin (5mm).",
      "Spread za'atar paste generously on each.",
      "Bake at 230°C (450°F) for 8-10 min until puffy and golden at edges."
    ],
    tags: ["bread", "breakfast", "zaatar", "baked", "vegan"]
  },
  {
    id: 10,
    name: "Labneh",
    nameAr: "لبنة",
    category: "meze",
    time: 5,
    servings: 4,
    difficulty: "easy",
    image: "🥛",
    description: "Strained yogurt cheese — thick, tangy, and eaten with olive oil and za'atar.",
    ingredients: [
      { item: "yogurt", amount: "500g full-fat plain" },
      { item: "salt", amount: "1 tsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "zaatar spice mix", amount: "1 tsp" },
      { item: "dried mint", amount: "pinch" }
    ],
    steps: [
      "Mix yogurt with salt.",
      "Pour into cheesecloth over a bowl. Tie and refrigerate 24-48 hours.",
      "The whey drains out leaving thick labneh.",
      "Serve spread on plate, drizzle with olive oil, sprinkle za'atar.",
      "Alternatively, roll into balls and store in olive oil with herbs."
    ],
    tags: ["vegetarian", "cheese", "dip", "breakfast"]
  },
  {
    id: 11,
    name: "Mjadra",
    nameAr: "مجدرة",
    category: "main",
    time: 45,
    servings: 4,
    difficulty: "easy",
    image: "🌾",
    description: "Lentils and rice topped with deeply caramelized onions — a humble yet magnificent dish.",
    ingredients: [
      { item: "brown lentils", amount: "1 cup" },
      { item: "rice", amount: "½ cup" },
      { item: "onions", amount: "3 large" },
      { item: "olive oil", amount: "½ cup" },
      { item: "cumin", amount: "1 tsp" },
      { item: "allspice", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "water", amount: "3 cups" }
    ],
    steps: [
      "Cook lentils in water 20 min until nearly tender.",
      "Meanwhile, slowly caramelize sliced onions in olive oil 25-30 min — low and slow is key.",
      "Add rice and spices to lentils, cook 15 more min.",
      "Top with crispy caramelized onions and any oil left in the pan.",
      "Serve with yogurt and tomato salad."
    ],
    tags: ["vegan", "lentils", "rice", "budget", "comfort food"]
  },
  {
    id: 12,
    name: "Warak Dawali",
    nameAr: "ورق دوالي",
    category: "main",
    time: 90,
    servings: 6,
    difficulty: "hard",
    image: "🌿",
    description: "Grape leaves stuffed with rice, herbs, and sometimes meat — rolled and slow-cooked.",
    ingredients: [
      { item: "grape leaves", amount: "1 jar (brined) or 40 fresh" },
      { item: "rice", amount: "1 cup short-grain" },
      { item: "ground beef", amount: "200g (optional)" },
      { item: "tomatoes", amount: "2 medium, diced" },
      { item: "parsley", amount: "½ cup chopped" },
      { item: "mint", amount: "¼ cup chopped" },
      { item: "onion", amount: "1 small, grated" },
      { item: "lemon juice", amount: "¼ cup" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "salt", amount: "to taste" }
    ],
    steps: [
      "Rinse grape leaves if brined. Blanch fresh leaves briefly.",
      "Mix rice with tomatoes, herbs, onion, meat (if using), oil, spices — don't cook.",
      "Place 1 tsp filling at base of each leaf, fold sides in, roll tight.",
      "Line pot with sliced tomatoes or extra leaves. Layer rolls seam-side down.",
      "Add water to just cover, drizzle lemon juice and olive oil.",
      "Weigh down with plate, simmer covered 45-60 min until rice tender."
    ],
    tags: ["festive", "stuffed", "rice", "slow-cooked"]
  },
  {
    id: 13,
    name: "Adas bil Hamod",
    nameAr: "عدس بالحامض",
    category: "soup",
    time: 40,
    servings: 4,
    difficulty: "easy",
    image: "🍲",
    description: "Lemony red lentil soup with Swiss chard — bright, nourishing, and totally Lebanese.",
    ingredients: [
      { item: "red lentils", amount: "1 cup" },
      { item: "Swiss chard", amount: "1 bunch (or spinach)" },
      { item: "onion", amount: "1 large, diced" },
      { item: "garlic", amount: "4 cloves, minced" },
      { item: "lemon juice", amount: "¼ cup" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "cumin", amount: "1 tsp" },
      { item: "salt", amount: "to taste" },
      { item: "water", amount: "6 cups" }
    ],
    steps: [
      "Sauté onion in olive oil until golden. Add garlic and cumin.",
      "Add lentils and water, simmer 20 min until lentils dissolve.",
      "Add chopped chard and lemon juice, cook 5 more min.",
      "Season and serve with extra lemon on the side."
    ],
    tags: ["vegan", "soup", "lentils", "lemon", "healthy"]
  },
  {
    id: 14,
    name: "Loubyeh bil Zayt",
    nameAr: "لوبية بالزيت",
    category: "main",
    time: 35,
    servings: 4,
    difficulty: "easy",
    image: "🫘",
    description: "Green beans braised in olive oil and tomato sauce with garlic — eaten warm or cold.",
    ingredients: [
      { item: "green beans", amount: "500g, trimmed" },
      { item: "tomatoes", amount: "2 large, diced (or 400g canned)" },
      { item: "onion", amount: "1 medium" },
      { item: "garlic", amount: "4 cloves" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "allspice", amount: "½ tsp" },
      { item: "cinnamon", amount: "¼ tsp" },
      { item: "salt", amount: "to taste" }
    ],
    steps: [
      "Sauté onion in olive oil until golden. Add garlic.",
      "Add green beans, cook 3 min, stirring.",
      "Add tomatoes and spices, stir to coat.",
      "Reduce heat, cover and simmer 20-25 min until beans tender.",
      "Serve with rice and pita."
    ],
    tags: ["vegan", "vegetable", "tomato", "comfort food"]
  },
  {
    id: 15,
    name: "Shawarma",
    nameAr: "شاورما",
    category: "main",
    time: 40,
    servings: 4,
    difficulty: "medium",
    image: "🌯",
    description: "Spiced marinated chicken or beef, sliced and wrapped with garlic sauce — street food royalty.",
    ingredients: [
      { item: "chicken thighs", amount: "700g, boneless" },
      { item: "yogurt", amount: "¼ cup" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "garlic", amount: "4 cloves" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cumin", amount: "1 tsp" },
      { item: "turmeric", amount: "½ tsp" },
      { item: "paprika", amount: "1 tsp" },
      { item: "cinnamon", amount: "¼ tsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "salt", amount: "1 tsp" },
      { item: "pita bread", amount: "4 rounds" },
      { item: "tomatoes", amount: "2" },
      { item: "pickles", amount: "to taste" }
    ],
    steps: [
      "Marinate chicken in yogurt, lemon, garlic, spices, and oil for at least 2 hours.",
      "Cook in hot oven at 220°C or under broiler 20-25 min, or pan-fry until charred.",
      "Slice thinly against the grain.",
      "Warm pita, add chicken, tomatoes, pickles.",
      "Drizzle with garlic sauce (toum) or tahini sauce."
    ],
    tags: ["chicken", "street food", "wrap", "marinated"]
  },
  {
    id: 16,
    name: "Kafta bil Sanieh",
    nameAr: "كفتة بالصينية",
    category: "main",
    time: 50,
    servings: 4,
    difficulty: "easy",
    image: "🥘",
    description: "Baked kafta in tomato sauce with potato slices — the Lebanese comfort bake.",
    ingredients: [
      { item: "ground beef", amount: "500g" },
      { item: "onion", amount: "1, grated" },
      { item: "parsley", amount: "¼ cup chopped" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "potatoes", amount: "3 medium, sliced thin" },
      { item: "tomatoes", amount: "3 medium, sliced" },
      { item: "tomato paste", amount: "2 tbsp" },
      { item: "water", amount: "1 cup" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "salt", amount: "to taste" }
    ],
    steps: [
      "Mix beef, onion, parsley, allspice, cinnamon, salt into kafta mixture.",
      "Spread kafta flat (2cm thick) in oven dish.",
      "Layer potato slices on top, then tomato slices.",
      "Dissolve tomato paste in water, pour over dish. Drizzle oil.",
      "Bake at 200°C for 40 min until potatoes are tender and top is golden."
    ],
    tags: ["meat", "baked", "tomato", "comfort food", "potato"]
  },
  {
    id: 17,
    name: "Samke Harra",
    nameAr: "سمكة حرة",
    category: "main",
    time: 45,
    servings: 4,
    difficulty: "medium",
    image: "🐟",
    description: "Whole fish baked with spicy tahini sauce, walnuts, and caramelized onions.",
    ingredients: [
      { item: "whole fish", amount: "1.5kg (bass or snapper)" },
      { item: "tahini", amount: "½ cup" },
      { item: "lemon juice", amount: "¼ cup" },
      { item: "garlic", amount: "4 cloves" },
      { item: "onions", amount: "2 large" },
      { item: "walnuts", amount: "½ cup" },
      { item: "cilantro", amount: "½ cup chopped" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "cumin", amount: "1 tsp" },
      { item: "cayenne pepper", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "water", amount: "¼ cup" }
    ],
    steps: [
      "Score fish on both sides, rub with cumin, salt.",
      "Caramelize sliced onions in oil 25 min. Add garlic, cilantro, cayenne.",
      "Blend tahini with lemon juice, water, garlic for sauce.",
      "Lay fish in baking dish, spread onion mix inside and around.",
      "Pour tahini sauce over fish, scatter walnuts.",
      "Bake at 190°C for 25-30 min until fish flakes."
    ],
    tags: ["fish", "seafood", "spicy", "tahini", "festive"]
  },
  {
    id: 18,
    name: "Balila",
    nameAr: "بليلة",
    category: "meze",
    time: 10,
    servings: 4,
    difficulty: "easy",
    image: "🫘",
    description: "Warm chickpeas dressed with cumin, lemon, and olive oil — simple perfection.",
    ingredients: [
      { item: "chickpeas", amount: "400g canned" },
      { item: "garlic", amount: "1 clove, minced" },
      { item: "lemon juice", amount: "2 tbsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "cumin", amount: "1 tsp" },
      { item: "salt", amount: "to taste" },
      { item: "parsley", amount: "for garnish" },
      { item: "paprika", amount: "pinch" }
    ],
    steps: [
      "Drain chickpeas, rinse. Warm in pan with a splash of their liquid.",
      "Add garlic, cumin, salt — toss briefly over heat.",
      "Transfer to bowl, drizzle lemon juice and olive oil.",
      "Garnish with parsley and paprika. Serve warm."
    ],
    tags: ["vegan", "chickpeas", "warm", "quick"]
  },
  {
    id: 19,
    name: "Laban Immo",
    nameAr: "لبن أمه",
    category: "main",
    time: 45,
    servings: 4,
    difficulty: "medium",
    image: "🍚",
    description: "Lamb meatballs cooked in stabilized yogurt sauce — delicate and warming.",
    ingredients: [
      { item: "ground lamb", amount: "400g" },
      { item: "rice", amount: "½ cup cooked" },
      { item: "yogurt", amount: "1 liter plain" },
      { item: "egg", amount: "1, beaten" },
      { item: "cornstarch", amount: "1 tbsp" },
      { item: "garlic", amount: "3 cloves" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "pine nuts", amount: "2 tbsp, toasted" },
      { item: "butter", amount: "1 tbsp" }
    ],
    steps: [
      "Mix lamb with cooked rice, allspice, cinnamon, salt — form small meatballs.",
      "Brown meatballs lightly in butter, set aside.",
      "Stabilize yogurt: in pot, whisk yogurt with egg and cornstarch. Bring to simmer stirring constantly in one direction.",
      "Add garlic and meatballs to yogurt, simmer 15 min.",
      "Serve over rice, garnish with toasted pine nuts."
    ],
    tags: ["lamb", "yogurt", "rice", "festive", "comfort food"]
  },
  {
    id: 20,
    name: "Rice with Vermicelli",
    nameAr: "رز بالشعيرية",
    category: "side",
    time: 25,
    servings: 4,
    difficulty: "easy",
    image: "🍚",
    description: "The classic Lebanese rice — golden vermicelli toasted in butter, cooked with fluffy rice.",
    ingredients: [
      { item: "rice", amount: "2 cups long-grain" },
      { item: "vermicelli noodles", amount: "½ cup broken" },
      { item: "butter", amount: "2 tbsp" },
      { item: "salt", amount: "1 tsp" },
      { item: "water", amount: "3 cups" }
    ],
    steps: [
      "Rinse rice until water runs clear. Soak 20 min.",
      "In pot, melt butter over medium heat. Add vermicelli and stir constantly until deep golden-brown.",
      "Quickly drain rice and add to pot, stir to coat with butter.",
      "Add water and salt, bring to boil.",
      "Cover, reduce to lowest heat, cook 15 min. Rest 5 min before fluffing."
    ],
    tags: ["rice", "side dish", "vegetarian", "butter"]
  },
  {
    id: 21,
    name: "Toum (Garlic Sauce)",
    nameAr: "ثوم",
    category: "sauce",
    time: 15,
    servings: 8,
    difficulty: "medium",
    image: "🧄",
    description: "Lebanese garlic aioli — a fluffy white garlic emulsion that goes with everything.",
    ingredients: [
      { item: "garlic", amount: "1 head, peeled" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "vegetable oil", amount: "1 cup (neutral, not olive)" },
      { item: "ice water", amount: "2 tbsp" },
      { item: "salt", amount: "½ tsp" }
    ],
    steps: [
      "Blend garlic with salt until minced.",
      "Add lemon juice and blend briefly.",
      "With blender running, add oil in a VERY thin stream — thinner than you think.",
      "Alternate adding a few drops of ice water to help emulsify.",
      "Keep blending until thick, white, and fluffy like mayonnaise.",
      "If it breaks, start over with a new garlic base and slowly add the broken mixture."
    ],
    tags: ["sauce", "vegan", "garlic", "condiment", "gluten-free"]
  },
  {
    id: 22,
    name: "Knafeh",
    nameAr: "كنافة",
    category: "dessert",
    time: 40,
    servings: 8,
    difficulty: "medium",
    image: "🧀",
    description: "Shredded wheat pastry filled with melted cheese, soaked in rose water syrup — possibly Lebanon's greatest dessert.",
    ingredients: [
      { item: "kataifi dough (shredded phyllo)", amount: "400g" },
      { item: "akkawi cheese", amount: "400g (or mozzarella)" },
      { item: "butter", amount: "150g, melted" },
      { item: "sugar", amount: "1.5 cups" },
      { item: "water", amount: "1 cup" },
      { item: "rose water", amount: "1 tbsp" },
      { item: "orange blossom water", amount: "1 tbsp" },
      { item: "food coloring", amount: "orange/red, few drops" },
      { item: "pistachios", amount: "¼ cup, crushed" }
    ],
    steps: [
      "Make syrup: boil sugar and water 5 min, add rose water and orange blossom. Cool.",
      "Soak akkawi cheese in cold water 1 hour to remove salt, then shred.",
      "Coat kataifi dough with melted butter and food coloring.",
      "Press half into buttered pan. Layer with cheese. Top with remaining kataifi.",
      "Bake at 200°C for 25-30 min until deep golden.",
      "Immediately pour cold syrup over hot knafeh. Garnish with pistachios. Serve hot."
    ],
    tags: ["dessert", "cheese", "sweet", "festive", "syrup"]
  },
  {
    id: 23,
    name: "Maamoul",
    nameAr: "معمول",
    category: "dessert",
    time: 90,
    servings: 20,
    difficulty: "medium",
    image: "🍪",
    description: "Butter shortbread cookies filled with dates, walnuts, or pistachios — made for Eid and Easter.",
    ingredients: [
      { item: "flour", amount: "2 cups" },
      { item: "semolina", amount: "1 cup fine" },
      { item: "butter", amount: "200g" },
      { item: "dates", amount: "200g, pitted and soft (filling)" },
      { item: "walnuts", amount: "1 cup, chopped (filling)" },
      { item: "rose water", amount: "2 tbsp" },
      { item: "orange blossom water", amount: "2 tbsp" },
      { item: "powdered sugar", amount: "for dusting" },
      { item: "milk", amount: "4 tbsp warm" }
    ],
    steps: [
      "Mix flour and semolina. Rub in melted butter until sandy.",
      "Add rose water and milk gradually — dough should hold but not be wet. Rest 30 min.",
      "Date filling: blend dates with 1 tbsp rose water into smooth paste.",
      "Walnut filling: mix walnuts with 2 tbsp sugar and ½ tsp cinnamon.",
      "Pinch dough into balls. Hollow, fill, seal, and press into maamoul mold or shape by hand.",
      "Bake at 180°C for 15-18 min — they should be pale, not browned.",
      "Dust generously with powdered sugar when warm."
    ],
    tags: ["dessert", "cookie", "dates", "festive", "Eid"]
  },
  {
    id: 24,
    name: "Baklava",
    nameAr: "بقلاوة",
    category: "dessert",
    time: 60,
    servings: 24,
    difficulty: "medium",
    image: "🥐",
    description: "Crispy phyllo layers filled with pistachio and walnut, drenched in scented syrup.",
    ingredients: [
      { item: "phyllo dough", amount: "400g, thawed" },
      { item: "pistachios", amount: "1 cup, chopped" },
      { item: "walnuts", amount: "1 cup, chopped" },
      { item: "butter", amount: "150g, melted" },
      { item: "sugar", amount: "1.5 cups (syrup)" },
      { item: "water", amount: "1 cup (syrup)" },
      { item: "rose water", amount: "1 tbsp" },
      { item: "lemon juice", amount: "1 tsp" },
      { item: "cinnamon", amount: "1 tsp" }
    ],
    steps: [
      "Make syrup first: boil sugar and water 5 min, add rose water and lemon juice. Let cool completely.",
      "Mix nuts with cinnamon and 2 tbsp sugar.",
      "Layer 8 phyllo sheets in buttered pan, brushing each with butter.",
      "Spread nut mixture. Continue layering remaining phyllo sheets with butter.",
      "Cut into diamond shapes before baking.",
      "Bake at 160°C for 50-55 min until deeply golden.",
      "Pour COLD syrup over HOT baklava immediately. Cool 4+ hours before serving."
    ],
    tags: ["dessert", "pastry", "nuts", "syrup", "festive"]
  },
  {
    id: 25,
    name: "Sfouf",
    nameAr: "صفوف",
    category: "dessert",
    time: 35,
    servings: 12,
    difficulty: "easy",
    image: "🟡",
    description: "Golden turmeric anise cake — dairy-free and distinctly Lebanese.",
    ingredients: [
      { item: "flour", amount: "2 cups" },
      { item: "semolina", amount: "1 cup" },
      { item: "sugar", amount: "1 cup" },
      { item: "turmeric", amount: "1 tsp" },
      { item: "anise seeds", amount: "1 tsp" },
      { item: "baking powder", amount: "1 tbsp" },
      { item: "vegetable oil", amount: "½ cup" },
      { item: "water", amount: "1.5 cups (warm)" },
      { item: "tahini", amount: "for greasing pan" },
      { item: "pine nuts", amount: "¼ cup (topping)" }
    ],
    steps: [
      "Mix dry ingredients: flour, semolina, sugar, turmeric, anise seeds, baking powder.",
      "Add oil and warm water, mix to smooth batter.",
      "Grease pan with tahini (traditional!).",
      "Pour batter, top with pine nuts.",
      "Bake at 180°C for 25-30 min until golden. Cool before cutting into squares."
    ],
    tags: ["dessert", "cake", "vegan", "turmeric", "anise"]
  },
  {
    id: 26,
    name: "Awamat",
    nameAr: "عوامات",
    category: "dessert",
    time: 40,
    servings: 6,
    difficulty: "medium",
    image: "🍩",
    description: "Lebanese fried dough puffs soaked in syrup — served hot, crispy outside and fluffy inside.",
    ingredients: [
      { item: "flour", amount: "2 cups" },
      { item: "yeast", amount: "1 tsp instant" },
      { item: "water", amount: "1.5 cups warm" },
      { item: "salt", amount: "½ tsp" },
      { item: "sugar", amount: "1 cup (syrup)" },
      { item: "water", amount: "¾ cup (syrup)" },
      { item: "rose water", amount: "1 tbsp" },
      { item: "lemon juice", amount: "1 tsp" },
      { item: "vegetable oil", amount: "for frying" },
      { item: "cinnamon", amount: "for dusting" }
    ],
    steps: [
      "Make batter: mix flour, yeast, salt with warm water — loose, sticky batter. Rest 1 hour.",
      "Make syrup: boil sugar with water 5 min, add rose water and lemon. Cool.",
      "Heat oil to 175°C. Drop spoonfuls of batter into oil.",
      "Fry 3-4 min, turning, until puffed and golden all over.",
      "Drain briefly, immediately dip in syrup.",
      "Serve hot, dusted with cinnamon."
    ],
    tags: ["dessert", "fried", "sweet", "syrup", "street food"]
  },
  {
    id: 27,
    name: "Ful Medames",
    nameAr: "فول مدمس",
    category: "breakfast",
    time: 20,
    servings: 4,
    difficulty: "easy",
    image: "🫘",
    description: "Slow-simmered fava beans with lemon, garlic, and cumin — the Lebanese power breakfast.",
    ingredients: [
      { item: "fava beans", amount: "400g canned" },
      { item: "garlic", amount: "3 cloves, minced" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "cumin", amount: "1 tsp" },
      { item: "salt", amount: "to taste" },
      { item: "chili flakes", amount: "pinch" },
      { item: "parsley", amount: "chopped, to serve" },
      { item: "tomatoes", amount: "1, diced (topping)" }
    ],
    steps: [
      "Warm fava beans in their liquid. Partially mash with fork.",
      "Add garlic, cumin, salt, chili flakes — simmer 5 min.",
      "Remove from heat, add lemon juice and olive oil.",
      "Serve topped with diced tomato, parsley, extra olive oil.",
      "Eat with pita bread."
    ],
    tags: ["vegan", "breakfast", "fava beans", "quick", "protein"]
  },
  {
    id: 28,
    name: "Raheb Salad",
    nameAr: "راهب",
    category: "salad",
    time: 40,
    servings: 4,
    difficulty: "easy",
    image: "🥗",
    description: "Roasted eggplant salad with tomatoes, peppers, and herbs — brotherly rival to baba ghanouj.",
    ingredients: [
      { item: "eggplant", amount: "2 large" },
      { item: "tomatoes", amount: "2 medium" },
      { item: "green pepper", amount: "1" },
      { item: "onion", amount: "½, finely diced" },
      { item: "parsley", amount: "¼ cup chopped" },
      { item: "garlic", amount: "1 clove, minced" },
      { item: "lemon juice", amount: "2 tbsp" },
      { item: "olive oil", amount: "3 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "pomegranate molasses", amount: "1 tsp (optional)" }
    ],
    steps: [
      "Char eggplants over flame or roast at 230°C until fully soft and blackened.",
      "Char pepper under broiler until blistered. Peel and chop.",
      "Peel and drain eggplant flesh, chop roughly.",
      "Combine everything — eggplant, pepper, tomatoes, onion, parsley, garlic.",
      "Dress with lemon juice, olive oil, and pomegranate molasses.",
      "Serve at room temperature."
    ],
    tags: ["vegan", "salad", "smoky", "eggplant", "cold"]
  },
  {
    id: 29,
    name: "Moghrabieh",
    nameAr: "مغربية",
    category: "main",
    time: 90,
    servings: 6,
    difficulty: "medium",
    image: "🫙",
    description: "Large pearl couscous cooked in chicken broth with chickpeas and seven-spice — a feast dish.",
    ingredients: [
      { item: "moghrabieh (pearl couscous)", amount: "400g" },
      { item: "chicken", amount: "1 whole or 1kg thighs" },
      { item: "chickpeas", amount: "400g canned" },
      { item: "pearl onions", amount: "200g (or regular onion)" },
      { item: "butter", amount: "3 tbsp" },
      { item: "seven spice (baharat)", amount: "2 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "caraway seeds", amount: "1 tsp" }
    ],
    steps: [
      "Boil chicken with salt and caraway seeds 45 min. Reserve broth.",
      "Sauté pearl onions in butter until golden.",
      "Toast moghrabieh beads in butter 3 min, stirring.",
      "Add 3 cups hot chicken broth, seven spice, cinnamon. Simmer 20-25 min.",
      "Add chickpeas and cooked chicken pieces. Heat through.",
      "Adjust seasoning. Serve in large dish with extra broth on the side."
    ],
    tags: ["chicken", "chickpeas", "festive", "couscous", "hearty"]
  },
  {
    id: 30,
    name: "Kaak bi Anise",
    nameAr: "كعك باليانسون",
    category: "breakfast",
    time: 50,
    servings: 16,
    difficulty: "medium",
    image: "🫙",
    description: "Lebanese bread rings flavored with anise and sesame — dunked in tea for breakfast.",
    ingredients: [
      { item: "flour", amount: "3 cups" },
      { item: "yeast", amount: "1 tsp instant" },
      { item: "anise seeds", amount: "1 tbsp" },
      { item: "sesame seeds", amount: "¼ cup" },
      { item: "sugar", amount: "1 tbsp" },
      { item: "salt", amount: "1 tsp" },
      { item: "olive oil", amount: "¼ cup" },
      { item: "water", amount: "¾ cup warm" }
    ],
    steps: [
      "Steep anise seeds in hot water 10 min, strain.",
      "Mix flour, yeast, sugar, salt, sesame seeds.",
      "Add anise water and olive oil. Knead until smooth dough. Rest 1 hour.",
      "Roll into ropes, form into rings or twist shapes.",
      "Let rest 20 min. Bake at 200°C for 15-18 min until golden."
    ],
    tags: ["bread", "breakfast", "anise", "sesame", "vegan"]
  }
,
  {
    id: 31,
    name: "Maakarone bil Lahme",
    nameAr: "مكرونة باللحمة",
    category: "main",
    time: 35,
    servings: 4,
    difficulty: "easy",
    image: "🍝",
    description: "Lebanese pasta with spiced ground beef in tomato sauce — a weeknight staple in every Lebanese home.",
    ingredients: [
      { item: "pasta", amount: "400g (penne or rigatoni)" },
      { item: "ground beef", amount: "400g" },
      { item: "onion", amount: "1 large, diced" },
      { item: "garlic", amount: "3 cloves, minced" },
      { item: "tomato paste", amount: "2 tbsp" },
      { item: "canned tomatoes", amount: "400g" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "black pepper", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "pine nuts", amount: "2 tbsp, toasted (optional)" }
    ],
    steps: [
      "Cook pasta in heavily salted boiling water until al dente. Reserve ½ cup pasta water, then drain.",
      "Brown ground beef in a dry pan over high heat, breaking it up. Drain excess fat.",
      "Add olive oil, onion, and garlic to the pan. Sauté 5 min until soft.",
      "Stir in tomato paste, cook 2 min. Add canned tomatoes, allspice, cinnamon, pepper, and salt.",
      "Simmer sauce 15 min until thickened. Loosen with pasta water if needed.",
      "Toss pasta into the sauce. Serve topped with toasted pine nuts."
    ],
    tags: ["pasta", "meat", "tomato", "quick", "family"]
  },
  {
    id: 32,
    name: "Sheikh el Mehche",
    nameAr: "شيخ المحشي",
    category: "main",
    time: 60,
    servings: 4,
    difficulty: "medium",
    image: "🍆",
    description: "Baby eggplants stuffed with spiced ground beef and pine nuts, braised in tomato sauce — a true Lebanese classic.",
    ingredients: [
      { item: "baby eggplants", amount: "8 small" },
      { item: "ground beef", amount: "300g" },
      { item: "pine nuts", amount: "3 tbsp" },
      { item: "onion", amount: "1 medium, finely diced" },
      { item: "tomato paste", amount: "2 tbsp" },
      { item: "canned tomatoes", amount: "400g" },
      { item: "garlic", amount: "2 cloves" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "vegetable oil", amount: "for frying" },
      { item: "olive oil", amount: "1 tbsp" }
    ],
    steps: [
      "Peel a lengthwise strip from each eggplant (keeps them from splitting). Fry in hot oil until golden all over. Set aside to drain.",
      "Sauté onion and pine nuts in olive oil until golden. Add beef, cook until browned. Season with allspice, cinnamon, salt.",
      "Cut a slit lengthwise in each fried eggplant without cutting through. Gently stuff with meat mixture.",
      "In a wide pot, mix canned tomatoes, tomato paste, garlic, salt, and ½ cup water. Bring to simmer.",
      "Nestle stuffed eggplants in the tomato sauce in a single layer.",
      "Cover and simmer on low heat 25-30 min until eggplants are very tender and sauce thickens.",
      "Serve with Lebanese rice and vermicelli."
    ],
    tags: ["eggplant", "stuffed", "meat", "tomato", "festive"]
  },
  {
    id: 33,
    name: "Kousa Mehche",
    nameAr: "كوسا محشي",
    category: "main",
    time: 75,
    servings: 4,
    difficulty: "medium",
    image: "🥒",
    description: "Lebanese grey zucchini hollowed and stuffed with rice and meat — cooked in tomato sauce or yogurt.",
    ingredients: [
      { item: "zucchini", amount: "8 small Lebanese/grey courgettes" },
      { item: "ground beef", amount: "250g" },
      { item: "rice", amount: "½ cup short-grain, rinsed" },
      { item: "onion", amount: "1 small, grated" },
      { item: "tomato paste", amount: "2 tbsp" },
      { item: "canned tomatoes", amount: "400g" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cinnamon", amount: "½ tsp" },
      { item: "black pepper", amount: "¼ tsp" },
      { item: "salt", amount: "to taste" },
      { item: "butter", amount: "1 tbsp" },
      { item: "water", amount: "1 cup" }
    ],
    steps: [
      "Core each zucchini using a apple corer or kousa corer tool, leaving a thin shell. Reserve the cores.",
      "Mix raw rice, ground beef, grated onion, allspice, cinnamon, pepper, and salt together.",
      "Fill each zucchini ¾ full with the raw stuffing — rice expands while cooking.",
      "In a large pot, mix tomatoes, tomato paste, butter, water, and salt. Bring to a boil.",
      "Add stuffed zucchini to the pot. Lay them in a single layer if possible.",
      "Cover and simmer on medium-low for 45-50 min until rice is cooked through.",
      "Rest 10 min before serving. Serve with plain yogurt on the side."
    ],
    tags: ["zucchini", "stuffed", "rice", "meat", "slow-cooked"]
  },
  {
    id: 34,
    name: "Castaletta",
    nameAr: "كاستاليتا",
    category: "main",
    time: 20,
    servings: 4,
    difficulty: "easy",
    image: "🥩",
    description: "Lebanese grilled lamb chops — marinated simply with garlic, lemon, and allspice, then seared over high heat.",
    ingredients: [
      { item: "lamb chops", amount: "8 (rib or loin chops)" },
      { item: "garlic", amount: "4 cloves, crushed" },
      { item: "lemon juice", amount: "3 tbsp" },
      { item: "olive oil", amount: "2 tbsp" },
      { item: "allspice", amount: "1 tsp" },
      { item: "cumin", amount: "½ tsp" },
      { item: "black pepper", amount: "½ tsp" },
      { item: "salt", amount: "1 tsp" },
      { item: "fresh thyme", amount: "4 sprigs (optional)" }
    ],
    steps: [
      "Mix garlic, lemon juice, olive oil, allspice, cumin, pepper, and salt into a marinade.",
      "Coat lamb chops thoroughly. Marinate at least 30 min at room temperature, or overnight in the fridge.",
      "Heat grill or cast iron pan until very hot — almost smoking.",
      "Sear chops 2-3 min per side for medium-rare, 3-4 min for medium. Do not crowd the pan.",
      "Rest 5 min before serving. Serve with toum (garlic sauce), fries, or tabbouleh."
    ],
    tags: ["lamb", "grilled", "BBQ", "quick", "meat"]
  },
  {
    id: 35,
    name: "Beef Stroganoff",
    nameAr: "ستروغانوف",
    category: "main",
    time: 40,
    servings: 4,
    difficulty: "easy",
    image: "🍄",
    description: "Tender beef strips in a rich mushroom and cream sauce — a beloved classic in Lebanese home cooking.",
    ingredients: [
      { item: "beef sirloin", amount: "600g, sliced into thin strips" },
      { item: "mushrooms", amount: "300g, sliced" },
      { item: "onion", amount: "1 large, sliced" },
      { item: "garlic", amount: "2 cloves, minced" },
      { item: "heavy cream", amount: "200ml" },
      { item: "beef broth", amount: "150ml" },
      { item: "butter", amount: "3 tbsp" },
      { item: "Dijon mustard", amount: "1 tsp" },
      { item: "Worcestershire sauce", amount: "1 tsp" },
      { item: "sour cream", amount: "2 tbsp (optional)" },
      { item: "flour", amount: "1 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "black pepper", amount: "to taste" },
      { item: "parsley", amount: "chopped, to serve" }
    ],
    steps: [
      "Season beef strips with salt and pepper. Sear in hot butter in batches (don't crowd!) 1-2 min per side. Remove and set aside.",
      "In the same pan, sauté onion until softened. Add garlic and mushrooms, cook until mushrooms are golden.",
      "Sprinkle flour over the vegetables, stir 1 min.",
      "Add beef broth and scrape up any brown bits. Stir in cream, mustard, and Worcestershire sauce.",
      "Simmer 5 min until sauce thickens. Return beef to the pan, heat through 2 min.",
      "Stir in sour cream off the heat. Taste and adjust seasoning.",
      "Serve over egg noodles, pasta, or rice. Garnish with parsley."
    ],
    tags: ["beef", "creamy", "mushrooms", "comfort food", "pasta"]
  },
  {
    id: 36,
    name: "Steak with Mashed Potatoes",
    nameAr: "ستيك و بطاطا بوريه",
    category: "main",
    time: 35,
    servings: 2,
    difficulty: "medium",
    image: "🥩",
    description: "Pan-seared steak with buttery, ultra-smooth mashed potatoes and a quick pan sauce.",
    ingredients: [
      { item: "ribeye or sirloin steak", amount: "2 steaks (250g each)" },
      { item: "potatoes", amount: "700g, peeled and cubed" },
      { item: "butter", amount: "100g (50g for mash, 50g for steak)" },
      { item: "heavy cream", amount: "100ml, warm" },
      { item: "garlic", amount: "3 cloves" },
      { item: "fresh thyme", amount: "4 sprigs" },
      { item: "rosemary", amount: "1 sprig (optional)" },
      { item: "olive oil", amount: "1 tbsp" },
      { item: "salt", amount: "to taste" },
      { item: "black pepper", amount: "to taste" }
    ],
    steps: [
      "Mashed potatoes: boil potatoes in salted water until very tender. Drain and steam dry 2 min.",
      "Rice or mash potatoes. Beat in 50g warm butter and warm cream until silky smooth. Season generously. Keep warm.",
      "Take steaks out of fridge 30 min before cooking. Pat bone dry. Season heavily with salt and pepper.",
      "Heat olive oil in cast iron until nearly smoking. Sear steaks 2-3 min per side for medium-rare.",
      "Add 50g butter, garlic cloves, and thyme to the pan. Baste steaks continuously 1 min with the foaming butter.",
      "Rest steaks on a board 5 min — this is non-negotiable. Pour pan juices over as a sauce.",
      "Serve steak sliced against the grain alongside the mashed potatoes."
    ],
    tags: ["beef", "steak", "potato", "dinner", "comfort food"]
  }
];

const ALL_INGREDIENTS = [...new Set(
  RECIPES.flatMap(r => r.ingredients.map(i => i.item))
)].sort();

const CATEGORIES = {
  all: "All Recipes",
  meze: "Meze & Appetizers",
  salad: "Salads",
  soup: "Soups",
  main: "Main Dishes",
  side: "Side Dishes",
  breakfast: "Breakfast",
  dessert: "Desserts",
  sauce: "Sauces"
};

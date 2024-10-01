const BASE_URL = 'https://world.openfoodfacts.org';

export const getProducts = async () => {
  console.log('all product api is call');
  try {
    const response =
      await fetch(`${BASE_URL}/cgi/search.pl?search_terms={name}&json=true 
 `);
    const data = await response.json();
    
    if (!data.products) {
      throw new Error('No products found');
    }

    const productsDetails = data.products.map((product) => ({
      id: product.id,
      barcode: product.code,
      name: product.product_name_en || product.product_name || 'Unknown Name',
      image:
        product.image_url || product.image_front_url || 'No image available',
      category: product.categories_old || 'No category available',
      ingredients: product.ingredients_text_en || 'No ingredients available',
      nutritionGrade:
        product.nutrition_grades || 'No nutrition grade available',
    }));

    return productsDetails;
  } catch (error) {
    console.log('error in getProducts', error);
    return [];
  }
};

export const getProductsByCategory = async (category) => {
  console.log('category api is called');
  try {
    const response = await fetch(`${BASE_URL}/category/${category}.json`);
    const data = await response.json();
    console.log('data is ', data.products);

    if (!data) {
      return [];
    }

    const productsWithDetails = data.products.map((product) => ({
      id: product.id,
      barcode: product.code,
      name: product.product_name_en || product.product_name || 'Unknown Name',
      image: product.image_url || 'No image available',
      category: product.categories_old || 'No category available',
      ingredients: product.ingredients_text_en || 'No ingredients available',
      nutritionGrade:
        product.nutrition_grades || 'No nutrition grade available',
    }));

    return productsWithDetails;
  } catch (error) {
    console.error('Error fetching products by category:', error);
  }
};

export const getProductDetail = async (barcode) => {
  console.log('product detail api is call');

  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    const data = await response.json();
   

    const productDetail = [
      {
        id: data.product?._id || barcode,
        brandName: data.product?.brands || ' ',
        name:
          data.product?.product_name ||
          data.product?.product_name_en ||
          'Unknown name',
          quantity: data.product?.quantity || 'Not available',
          grade: data.product?.nutrition_grades|| "Not available",
        image:
          data.product?.image_front_url ||
          data.product?.image_url ||
          'No image available',
        ingredients:
          data.product?.ingredients_hierarchy ||
          data.product?.ingredients_original_tags ||
          data.product?.ingredients_tags ||
          [],

        nutritionalValue:
          data.product?.nutrient_levels || 'Not available' || {},
        nutriscoreData: data.product?.nutriscore_data || 'Not available',
        labels:
          data.product?.labels_hierarchy || data.product?.labels_tags || [],
      },
    ];

   
    return productDetail;
  } catch (error) {
    console.log('erro in product detail', error);
  }
};

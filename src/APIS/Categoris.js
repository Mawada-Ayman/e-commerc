import axios from "axios"

export async function getCategories()
{
    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/6407ebf65bbc6e43516931ec')
        return data
        
    } catch (error) {
          return error?.message
    }
}

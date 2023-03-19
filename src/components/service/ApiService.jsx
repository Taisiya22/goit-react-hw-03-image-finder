import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33166169-8998641aed83cb2aacc3c64c9';

export async function imgApi(searchQuery, page) {
  const res = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return res.data;
}

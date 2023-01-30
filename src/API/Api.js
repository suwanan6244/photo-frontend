import axios from "axios";


export const getData = async ({ setGetDataLoading, setResult }) => {
  try {
    let res = await axios.get(`http://localhost:5000/allimage`);
    setGetDataLoading(false);
    setResult(res.data);
  } catch (error) {
    alert(error.response.data.msg);
    setGetDataLoading(false);
  }
};

export const postData = async ({
  setpostDataLoading,
  setPostDatas,
  title,
  image,
}) => {
  try {
    const datas = { title, image: image.filesUploaded[0].url };
    setpostDataLoading(true);
    let res = await axios.post(`http://localhost:5000/image`, datas);
    if (res) {
      setpostDataLoading(false);
      setPostDatas(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
    setpostDataLoading(false);
  }
};
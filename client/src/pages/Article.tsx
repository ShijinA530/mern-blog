import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import Articles from './../components/Articles';
import NotFound from "./NotFound";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";


export default function Article() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:3000/api/articles/${name}`);
        const body = await result.json(); // Await the JSON response
        console.log(body);
        setArticleInfo(body);
      } catch (err) {
        console.error("error fetching data",err)
      }
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFound />;
  const otherArticles = articles.filter(article => article.name !== name);

  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {article.content.map((para, index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
          {para}
        </p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
      <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">Other Articles</h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </>
  );
}

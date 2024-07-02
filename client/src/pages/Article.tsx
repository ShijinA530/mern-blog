import { useParams } from "react-router-dom"
import articles from "./article-content"
import Articles from './../components/Articles';
import NotFound from "./NotFound";

export default function Article() {
    const {name} = useParams()
    const article = articles.find(article => article.name === name)
    const otherArticles = articles.filter(article => article.name !== name) 
    if (!article) return <NotFound/>
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
      <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">Other Articles</h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles}/>
      </div>
    </>
  )
}

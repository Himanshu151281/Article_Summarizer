import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      setIsLoading(true);
      const summaryText = await summarize(url);
      setSummary(summaryText);
      setIsLoading(false);
    }
  };

  const summarize = async (val) => {
    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: {
        url: val,
        lang: "en",
        engine: "2",
      },
      headers: {
        // if u are using this code, replace the x-rapidapi-key with your own key
        // this api is free u can checkout https://rapidapi.com/ and search for article summarizer to get your own key
        "x-rapidapi-key": "c1706fb982msh93ebbdc7e57ea3dp1e0442jsnbc99aba86a87",
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      // console.log(response);
      // console.log(response.data);
      // console.error(error);
      // return response.data;
      return response.data.summary;
    } catch (error) {
      console.error(error);
      return "Error summarizing the article.";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-card p-6 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Article Summarizer
        </h2>
        <p className="text-muted-foreground mb-4">
          Enter a URL to summarize an article using AI
        </p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="url"
            placeholder="https://example.com/article"
            className="border border-border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring focus:ring-ring"
            required
          />
          <button
            type="submit"
            className="bg-stone-900 text-destructive-foreground hover:scale-105 hover:bg-stone-700 p-2 rounded-lg w-full text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="flex justify-center">
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  {/* Summarizing... */}
                </div>
              </>
            ) : (
              "Summarize"
            )}
          </button>
        </form>
        {summary && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Summary:</h3>
            <div className="prose">{summary}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

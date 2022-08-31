import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";

import LandingPage from "./screens/LandingPage/LandingPage";
import MyArticles from "./screens/MyArticles/MyArticles";
import ArticlesNotApprouved from "./screens/MyArticles/ArticlesNotApprouved";

import SingleArticle from "./screens/SingleArticle/SingleArticle";
import DisplayArticle from "./screens/SingleArticle/displayArticleScreen";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateArticle from "./screens/SingleArticle/CreateArticle";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShowProfileScreen from "./screens/ProfileScreen/showProfile";

import Users from "./screens/Users/Users";
// import pageNotFound from "./components/pageNotFound";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/showprofile/:id" component={ShowProfileScreen} />
        <Route
          path="/myarticles"
          component={({ history }) => (
            <MyArticles search={search} history={history} />
          )}
        />
        <Route
          path="/articlesnotapprouved"
          component={({ history }) => (
            <ArticlesNotApprouved search={search} history={history} />
          )}
        />
        <Route path="/myusers" component={Users} />
        <Route path="/article/:id" component={SingleArticle} />
        <Route path="/displayArticle/:id" component={DisplayArticle} />
        <Route path="/createarticle" component={CreateArticle} />;
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/about" component={About} />
        {/* <Route path="*" component={pageNotFound} /> */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import PropTypes  from 'prop-types'
export default class NewsList extends Component {
    // totalResults=38
    // totalPages = Math.ceil(this.totalResults / 20);
    // pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
static defaultProps={
  country:'in',
  pageLimit: 10,
  category:'general'
}
static propTypes={
  country: PropTypes.string,
  pageLimit: PropTypes.number,
  category:PropTypes.string
}


    changeData = async (data) => {
      this.setState({ loading: true, articles:[] })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b7e9686089b477d9f140243fd5fda02&pageSize=${this.props.dataLimit}&page=${data}`
        let news = await fetch(url)
        let parsedNews = await news.json()

        this.setState({ articles: parsedNews.articles, totalResults: parsedNews.totalResults, loading: false })
    }

    pageChange = (event) => {
        const value = event.target.innerText; // Get the text content of the clicked element

        if (!isNaN(value)) {
            // Check if it's a number
            if (this.state.currentpage !== parseInt(value)) {
                this.setState({ currentpage: parseInt(value) }, () => {
                    // Callback function, called after state is updated
                    this.changeData(this.state.currentpage);
                });
            }
        } else if (value === 'Next') {
            let totalpage = this.state.pageNumbers.length;
            if (this.state.currentpage < totalpage) {
                this.setState({ currentpage: this.state.currentpage + 1 }, () => {
                    // Callback function, called after state is updated
                    this.changeData(this.state.currentpage);
                });
            }
        } else if (value === 'Previous') {
            if (this.state.currentpage > 1) {
                this.setState({ currentpage: this.state.currentpage - 1 }, () => {
                    // Callback function, called after state is updated
                    this.changeData(this.state.currentpage);
                });
            }
        }
    };
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [], // Initialize articles as an empty array
            loading: false,
            totalResults: 38,
            currentpage: 1,
            pageLimit: 10,
            totalPages: 1, // Calculate totalPages based on totalResults
            pageNumbers: [], // Initialize pageNumbers as an empty array
        };
        document.title =`${this.capitalizeFirstLetter(this.props.category)} - React News`
        
    }


    async componentDidMount() {
      console.log(this.props.category)
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b7e9686089b477d9f140243fd5fda02&pageSize=${this.props.dataLimit}`
        let news = await fetch(url)
        let parsedNews = await news.json()

        this.setState({
            articles: parsedNews.articles,
            totalResults: parsedNews.totalResults,
            totalPages: Math.ceil(this.state.totalResults / this.props.dataLimit),
            pageNumbers: Array.from({ length: Math.ceil(this.state.totalResults / this.props.dataLimit) }, (_, i) => i + 1),
            loading: false
        })
    }

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h1 className='text-center'>Top Headlines on- {this.capitalizeFirstLetter(this.props.category)}</h1>
                    {this.state.loading && (<Loader />)}
                    <div className="row justify-content-center">
                        {this.state.articles.map((news) => {
                            return <div key={news.url} className="col-md-3 col-sm-5 mx-1 my-1 p-2">
                                <NewsItem
                                    title={news.title ? news.title.slice(0, 30) : ''}
                                    desc={news.description ? news.description.slice(0, 90) : ''}
                                    imgUrl={news.urlToImage}
                                    newsurl={news.url}
                                    date={news.publishedAt}
                                    author={news.author}
                                    src={news.source.name}
                                />
                            </div>
                        })}



                    </div>
                </div>
                <div className="container">
                    <nav aria-label="Page navigation example">
                        {this.state.pageNumbers.length > 1 &&
                            <ul className="pagination">
                                <li className="page-item "><button className={"page-link" + (this.state.currentpage === 1 ? ' bg-dark' : '')} disabled={this.state.currentpage === 1} onClick={this.pageChange} value="Previous">Previous</button></li>
                                {this.state.pageNumbers.map((pageNumber) => (
                                    <li className="page-item" key={pageNumber}>
                                        <button className="page-link" vlaue={pageNumber} onClick={this.pageChange}>{pageNumber}</button>
                                    </li>
                                ))}
                                <li className="page-item"><button disabled={this.state.currentpage === this.state.pageNumbers.length} className={"page-link" + (this.state.currentpage === this.state.pageNumbers.length ? ' bg-dark' : '')} onClick={this.pageChange} vlaue="Next">Next</button></li>
                            </ul>}


                    </nav>
                </div>
            </>
        )


    }
}

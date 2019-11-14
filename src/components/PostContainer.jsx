import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Post from './Post';
import Loader from './Loader';
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import './PostContainer.css'

class PostContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      posts: [],
      error: null,
      sortUp: true
    }
  }

  handleClick = () => {
    this.setState({
      sortUp: !this.state.sortUp
    });
  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow')
      .then(res => {
        const posts = res.data.items;
        console.log(posts);
        this.setState({ posts, isLoading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
        console.log(error.message);
      });
  }

  render() {
    const { isLoading, posts, error, sortUp } = this.state;

    if (isLoading) {
      return <Loader />
    }

    if (error) {
      return <p>{error}</p>
    }

    return (
      <React.Fragment>
        <button className="btn-sort" onClick={this.handleClick}>
          Сортировка по дате создания
          <span className="icon">{sortUp ? <FaSortAmountDown /> : <FaSortAmountUp />}</span>
        </button>
        <div className="posts">
          {_.orderBy(
            _.filter(posts, post => post.is_answered && post.owner.reputation >= 50),
            post => post.creation_date, 
            sortUp ? ['asc'] : ['desc']
          )
            .map((post, index) =>
              <Post key={index} link={post.link} owner={post.owner} title={post.title} />
            )}
        </div>
      </React.Fragment>
    )
  }
}

export default PostContainer

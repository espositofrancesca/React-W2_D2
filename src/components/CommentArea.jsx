import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState } from "react";
import { useEffect } from "react";

const CommentArea = (props) => {
  /*   state = {
    comments: [], // comments will go here
    isLoading: false,
    isError: false,
  } */

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      /* this.setState({
        isLoading: true,
      }) */
      setIsLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NGQ3NjViYTcyMTAwMTVkYjdhOWYiLCJpYXQiOjE2NjI0NzE1NDMsImV4cCI6MTY2MzY4MTE0M30.qJTgQlsb5sg65Ps7VlqJ3xywKO7Ap2frXngQQV98wYo",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          /* this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          }) */
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          console.log("error");
          /* this.setState({ isLoading: false, isError: true }) */
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        /*    this.setState({ isLoading: false, isError: true }) */
        setIsLoading(false);
        setIsError(true);
      }
    };
    getComments();
  }, [props.asin]);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;

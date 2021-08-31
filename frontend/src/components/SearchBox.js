import React from "react";
import { Form, Button } from "react-bootstrap";
const SearchBox = ({history}) => {
  const [keyword, setKeyword] = React.useState("");

  const submitHandler= (e) => {
      e.preventDefault();
      if(keyword.trim()){
          history.push(`/search/${keyword}`);
      }else{
          history.push("/");
      }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
      style={{width:"492px",height:"32px"}}
        type="text"
        name="q"
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>;
      <Button type="submit" variant="outline-success" className='p-1'
      style={{height:"32px"}}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

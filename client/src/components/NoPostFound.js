import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

const NoPostFound = () => {
  function reloadComponent() {
    window.location.reload(false);
  }

  return (
    <>
      <Card className="text-center mx-5 my-5">
        <Card.Header as="h1">No post found !</Card.Header>
        <Card.Body>
          <Button onClick={reloadComponent}>Go back</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default NoPostFound;

<div style={{ height: "100vh" }}>
  <div>
    <Button labelPosition="left" icon secondary as={Link} to="/inventory">
      Back
      <Icon name="left arrow" />
    </Button>
  </div>
  <br />
  <div>
    <Grid>
      <Grid.Column width={9}>
        <Grid.Row>
          <Header as="h1" textAlign="left">
            Add a Finished Good
          </Header>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={7} textAlign="right">
        <Button labelPosition="right" icon primary onClick={handleSubmit}>
          Submit
          <Icon name="send" />
        </Button>
      </Grid.Column>
    </Grid>
  </div>
  <Divider />
  <Form>
    <Form.Group>
      <b>Add Finished Good:</b>
      <Dropdown
        required
        placeholder="Finished Goods"
        labeled="Add Finished Good"
        fluid
        selection
        search
        scrolling
        options={recipes}
        value={selected}
        onChange={handleSelectedChange}
        width={6}
      />
      <Form.Input
        required
        width={4}
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
    </Form.Group>
  </Form>
</div>;

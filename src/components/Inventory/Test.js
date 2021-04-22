const ExpandableTableRow = props => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
  
    const toggleStyle = {
      display: isOpen ? "table-row" : "none"
    };
  
    const { data, value } = props;
  
    console.log(props);
    return (
      <>
        <Table.Body>
          <Table.Row key={value} onClick={handleToggle}>
            <Table.Cell textAlign="center">{value}</Table.Cell>
          </Table.Row>
          <Table.Row style={toggleStyle}>
            {Object.keys(data).map(value => {
              return <div>{console.log(value)}Test</div>;
            })}
          </Table.Row>
        </Table.Body>
      </>
    );
  };


  return (
    <Table.Body>
      <Table.Row key={value} onClick={this.handleToggle}>
        <Table.Cell textAlign="center">{value}</Table.Cell>
      </Table.Row>
      <Table.Row  style={toggleStyle}>
        {items.forEach(items => {
          return (
            <>
              <Table.Cell textAlign="center">
                {items.name}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {items.description}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {items.quantity}
              </Table.Cell>
              <Table.Cell textAlign="center">
                ${items.cost}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {items.dateRestocked}
              </Table.Cell>
            </>
          );
        })}
      </Table.Row>
    </Table.Body>
  );
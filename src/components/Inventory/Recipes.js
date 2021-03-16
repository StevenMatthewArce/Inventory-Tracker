import React from 'react';

import { Grid, Segment, Table } from 'semantic-ui-react';

import { projectFirestore } from '../Firebase';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      expandedRows: [],
    }
  }

  componentDidMount() {
    projectFirestore.collection('recipes')
      .orderBy('name', 'asc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        })
        this.setState({
          recipes: documents,
        });
      });
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderRecipeDetails(recipe) {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Column>{recipe.ingredient}</Grid.Column>
          <Grid.Column>{recipe.photo}</Grid.Column>
        </Grid>
      </Segment>
    )
  }

  renderRecipe(recipe, index) {
    const clickCallBack = () => this.handleRowClick(index);
    const recipeRows = [
      <Table.Row onClick={clickCallBack} key={"row-data-" + index}>
        <Table.Cell textAlign='center'>{recipe.name}</Table.Cell>
        <Table.Cell textAlign='center'>{recipe.dateCreated}</Table.Cell>
        <Table.Cell textAlign='center'>{recipe.description}</Table.Cell>
      </Table.Row>
    ]
    if (this.state.expandedRows.includes(index)) {
      recipeRows.push(
        <Table.Row key={'row-expanded-' + index}>
          <Table.Cell colSpan='3'>{this.renderRecipeDetails(recipe)}</Table.Cell>
        </Table.Row>
      )
    }
    return recipeRows;
  }

  render() {
    let allRecipeRows = [];

    this.state.recipes.forEach((recipe, index) => {
      const perRecipeRows = this.renderRecipe(recipe, index);
      allRecipeRows = allRecipeRows.concat(perRecipeRows);
    })

    return (
      <div style={{ height: '100vh' }}>
        <Table celled fixed singleLine collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center' width={4}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' width={2}>
                Date Created
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' width={2}>
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allRecipeRows}
          </Table.Body>
        </Table>
      </div>
    )
  }

}

export default Recipes;

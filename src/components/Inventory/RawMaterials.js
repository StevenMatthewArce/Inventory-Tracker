import React from 'react';

import { projectFirestore } from '../Firebase';

class RawMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
    }
  }

  componentDidMount() {
    projectFirestore.collection('items')
      .orderBy('quantity', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        })
        this.setState({
          items: documents,
        });
      });
  }

  render() {
    let items = this.state.items;
    console.log(typeof items)
    return (
      <div>
        {items && items.map(item => (
          <div className='item-wrap' key={item.id}>
            {item.cost}
          </div>
        ))}
      </div>
    )
  }

}

export default RawMaterials;

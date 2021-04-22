import { forEach } from "lodash";

function rawMaterialsAlert() {
    forEach(item.quantity){
        if(item.quantity < 10){

        }
    }
    // ref.on("value", function(snapShot){
    //     snapShot.forEach(function(childSnapshot){
    //         var data = childSnapshot.val();
    //         return data.quantity;
    //     }
    //     );
    // })
}

function newtrying(){
    db.collection("finishedgoods")
    .orderBy("quantity", "desc")
    .onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        data: documents
      });
    });
}
}
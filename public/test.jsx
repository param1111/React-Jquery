var App = React.createClass({
  getInitialState: function() {
    return {data: [],upper:20,lower:0};
  },

  next:function(){
    this.r(1);  
},

  prev:function(){
    this.r(0);  
}, 

  r:function(a) {
    var u,l;
        if(a==1){
          u = this.state.upper+20;
          l = this.state.lower+20;
        }
        else if(a==0){
          u = this.state.upper-20;
          l = this.state.lower-20;
        }
        else{
          u = this.state.upper;
          l = this.state.lower;
        }

       $.ajax({
          url: '/employee?_start='+l+'&_end='+u,
          dataType: 'json', 
          cache: false,
          success: function(data1,x,y) {
          this.setState({data: data1,upper:u,lower:l});          
          console.log(data1.length);
      }.bind(this),

    });      
        

   },
   componentWillMount() {
       this.r();  
   },

  render: function() {  

    var rows = this.state.data.map(function(row, key){

      return(
        <tr key ={key}>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.gender}</td>
          <td>{row.age}</td>
          <td>{row.company}</td>
          <td>{row.phone}</td>
        </tr>
      );
    });

    return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>GENDER</th>
            <th>AGE</th>
            <th>COMPANY</th>
            <th>PHONE</th>
          </tr>
          {rows}
        </thead>
      </table>
        <nav>
          <ul className="pager">
            <li><a id="1" type = "button" onClick={this.prev}>Previous</a></li>
            <li><a id="1" type = "button" onClick={this.next}>Next</a></li>
            
          </ul>
        </nav>
      </div>
    );
  }

});

ReactDOM.render(
  <App/>, document.getElementById('content')
);




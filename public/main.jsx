
var App = React.createClass({
    getInitialState: function() {
    return ({data: [],upper:20,lower:0});
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
          success: function(data1) {
          this.setState({data: data1,upper:u,lower:l});
      }.bind(this),

    });              

   },

   delete:function(arg){

             $.ajax({
                type:'DELETE',
                url: 'http://localhost:8080/employee/'+arg.id,
                dataType: 'json',
                cache: false,
                success: function(){
                   alert("Successfully deleted");
                  var data =  this.state.data;
                  data.splice(data.indexOf(arg),1);                         
                            }
                        }); 

           },

   componentWillMount:function() {
       this.r();  
  },

  handleNew:function(){
    ReactDOM.render(<Create />,document.getElementById("create"));
  },

    render: function() {  
    var rows = this.state.data.map(function(row, key){

      return(
        <Row data={row} key={key} index={key} delete={this.delete} />
      ); 
    }.bind(this));

    return (
    <div>
      <input type="button" value="Create New" className="btn btn-info" onClick={this.handleNew}/>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>COMPANY</th>
            <th>PHONE</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>        
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

  var Create=React.createClass({
    getInitialState: function(){
        return({data:
            {
                name : '',
                gender : '',
                age : '',
                email : '',
                phone : ''
            }
            });
    },

    create:function(){  

                $.ajax({
                        type: 'POST', 
                        dataType: 'json', 
                        url: "http://localhost:8080/employee", 
                        headers: {"Content-Type": "application/json"},
                        data: JSON.stringify(this.state.data),                           
                        success: function(){
                            alert('Created successfully');
                        }
                    });
    },

      change: function(str,e){
        console.log(str);
        var data = this.state.data;
        data[str] = e.target.value;
        this.setState({data: data});
    },

    render: function(){
        var style={};
        return(
            <div>
                <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input style={style} onChange={this.change.bind(this,'name')} /></td>
                        <td><input style={style} onChange={this.change.bind(this,'gender')} /></td>
                        <td><input style={style} onChange={this.change.bind(this,'age')} /></td>
                        <td><input style={style} onChange={this.change.bind(this,'email')} /></td>
                        <td><input style={style} onChange={this.change.bind(this,'phone')} /></td>
                    </tr>
                </tbody>
            </table>
            <center>
                <input type="button" value="Create" className="btn btn-info" onClick={this.create}/>
            </center>
            </div>
        );
    }
});

  var Row = React.createClass(  {

    getInitialState: function(){
        return({data:this.props.data});
    },

    //function for updating data
    Update: function(){
            $.ajax({
              type: 'PUT', 
              dataType: 'json', 
              url: "http://localhost:8080/employee/"+this.state.data.id, 
              headers: {"Content-Type": "application/json"}, 
              data: JSON.stringify(this.state.data),
                        success: function(){
                        alert("Updated");                                                    
                        }
            });
    },
    
    

    change: function(str,e){
        console.log(str);
        var data = this.state.data;
        data[str] = e.target.value;
            this.setState({data: data});
    },

    render: function(){
        var style={borderStyle: 'none'};
        console.log('hello');
        return(
            <tr key={this.props.index}>
                <td><input defaultValue={this.state.data.id} style={style}/></td>
                <td><input value={this.state.data.name} style={style} onChange={this.change.bind(this,'name')}/></td>
                <td><input value={this.state.data.age} style={style} onChange={this.change.bind(this,'age')}/></td>
                <td><input value={this.state.data.gender} style={style} onChange={this.change.bind(this,'gender')}/></td>
                <td><input value={this.state.data.email} style={style} onChange={this.change.bind(this,'email')}/></td>
                <td><input value={this.state.data.phone} style={style} onChange={this.change.bind(this,'phone')}/></td>
                <td><button className="btn btn-danger" onClick={this.props.delete.bind(this,this.props.data)}>DELETE</button></td>
                <td><button className="btn btn-primary" onClick={this.Update}>UPDATE</button></td>
            </tr>
        );
    }
});

ReactDOM.render(
  <App/>, document.getElementById('content')
);
import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import  
    MapView,
    {Marker,
    Polyline,
    Callout,
    PROVIDER_GOOGLE,
    GOOGLE_MAPS_APIKEY,
        
} from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';

import Reload from '../utils/Img/Reload.png'
import RenderMap from '../components/Map/RenderMap'
import ButtonMap from '../components/Map/ButtonsMap'
import CovidMarker from '../utils/Img/MapMarkers/CovidMarker.png'
import GeneralMarker from '../utils/Img/MapMarkers/GeneralMarker.png'
import OdontologiaMarker from '../utils/Img/MapMarkers/OdontologiaMarker.png'





class App extends Component {

    constructor (props){

    
    super(props);

    /* setInterval(() => {
      this._getLocationAsync();
    }, 200); */

   /*  setInterval(() =>{
      this.componentDidMount();    
    },1000);

    setInterval(() =>{
      this.MapList();    
    },1000); */



    this.state={
        Nombre:null,
        Hospitals:[],
        Hospitals:[ 
                    {latitude: 4.699050, longitude: -74.050105, category:1, title:'Tunal'},
                    {latitude: 4.671959, longitude: -74.083579, category:2, title:'Chricales'},
                    {latitude: 4.683959, longitude: -74.083579, category:3, title:'Country'},
                    {latitude: 4.671959, longitude: -74.050105, title:'Kennedy'},
        ], 
        Mapa:[],
        location:null,
        errorMsg:null,
        UserLatitude:0.0,
        UserLongitude:0.0,
        HospitalCategory:'NoSelected',
        Aux:0,
        KeyRefresh:1,
        };
    }

    componentDidMount() {
        
    }

    async componentDidMount(){
    
    /* const url = 'http://181.54.182.7:5000/api/hospitals'
    const response = await fetch(url)
    let data = await response.json()
    //console.log(data)
        this.setState({
            Mapa:data
        })

        let DataRead = this.state.Mapa 
        let Go  = []
        DataRead.map(function(arr){
            
        const obj={
            latitude:arr.lat,
            longitude:arr.lng,
            title:arr.name,
            address:arr.address,
            category:arr.category
            }
            Go.push(obj)
            //console.log(obj)
        })
        this.setState({Hospitals:Go});  */
        


        /* await Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(`Posicion: ${position}`);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ).catch(e=>console.log(e)) */

        
    }


/*     GoToQR = (HN,HA) =>{
    const {navigation}= this.props;
    
    navigation.navigate('QR', 
                                {
                                HospitalName: HN, 
                                HospitalAddres:HA, 
                                UserLatitude: this.state.UserLatitude, 
                                UserLongitude: this.state.UserLongitude 
                                }
                            )

    } */
    
    touchedOpacity = (ref) =>{
        this.setState({
            //KeyRefresh: this.state.KeyRefresh+1,
            HospitalCategory: ref
        })
    }

    onMapPress = (MarkerCoord) =>{
        //console.log('in')
        //Alert.alert("coordinates:" + JSON.stringify(MarkerCoord.nativeEvent.coordinate));
        let m= MarkerCoord.nativeEvent.coordinate
        let coor=
            {
                lat: m.latitude,
                lng: m.longitude,
                name:"Prueba",
                address:"1",
                category:"2"
            }
        
        console.log('inx2')
        console.log(coor)
        this.setState({KeyRefresh: this.state.KeyRefresh +1})
        this.sendMarker(m)

    }

    sendMarker = async(coor) =>{
        fetch('http://181.54.182.7:5000/api/hospitals', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
                lat:coor.latitude,
                lng:m.longitude,
                name:"Prueba",
                address:"1",
                category:"2"
            })
            
        })
        .then((response) => response.json())
            .then((text) => {
            //console.log(text._id)
            //console.log(text._id.toString())
            //this.setState({valueForQRCode: (text._id).toString()})
            console.log('Innn')
            
            })
            .catch(err=>{
            console.log(err)
            })
    }

    render(){

    const Bogotá_Coordinates ={ latitude: 4.6097100,
                                longitude: -74.0817500,
                                latitudeDelta: 0.27, /*0.0922*/
                                longitudeDelta: 0.27, /*0.0421*/};
    const {navigation}= this.props;
    const {HospitalCategory} = this.state;
    const {KeyRefresh} = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}  >
                    <RenderMap
                        Hospitals={this.state.Hospitals}
                        refreshScreen={this.state.KeyRefresh}
                        HospitalCategory={this.state.HospitalCategory}
                        onMapPress={this.onMapPress}
                    />
                </View>
                <View style={styles.footer} >
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="Odontologia"
                        Img={OdontologiaMarker}
                        bgColor='rgba(71,185,219,0.5)'
                        brColor='rgba(26,100,122,0.8)'
                    />
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="Covid"
                        Img={CovidMarker}
                        bgColor='rgba(91,225,100,0.5)'
                        brColor='rgba(44,129,49,0.8)'
                    />
                    <ButtonMap
                        touchedOpacity={this.touchedOpacity}
                        title="General"
                        Img={GeneralMarker}
                        bgColor='rgba(71,185,219,0.5)'
                        borColor='rgba(26,100,122,0.8)'
                    />
                    <View style={{fle:1,marginTop:'1%',  alignItems:'flex-end', marginHorizontal:'0%'}} >
                        <TouchableOpacity
                            onPress={(KeyRefresh)=> this.setState({
                                HospitalCategory: 'NoSelected', KeyRefresh: KeyRefresh+1}
                            )} //this.componentDidMount()
                        >
                            <Image 
                                source={Reload}
                                style={styles.image}
                            />            
                        </TouchableOpacity>
                    </View>
                    
                </View>
                

            
            </View>
        );
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
    //paddingTop:'15%',

    //flexDirection:'row'
    
  },

  viewTouchable:{
    marginHorizontal:'1%',
    alignSelf:'center',
  },

  textTouchable:{
    textAlign:'center', 
    margin:'3%'
  },

  markerImage:{
    width:70,
    height:70
  },

  mapStyle:{
    flex:1,
    //width:'90%',
    //height:'80%'
    
  },

  mapContainer:{
    flex:10,
    borderColor:'black',
    borderWidth:1,
    marginHorizontal:'3%',
    //marginVertical:'7%',
    width:'95%',
    height:'90%',
    borderRadius:4,
  },

  image:{
    width:45,
    height:45,
    borderRadius:30,
    //flex:1
  },

  footer:{
    flexDirection:'row',
    //justifyContent:'space-between',
    //marginVertical:'4%'
  },

});
export default App






/* 
<View style={styles.viewTouchable} >
                        <TouchableOpacity
                        onPress={(KeyRefresh)=> this.setState({HospitalCategory: 'Odontologia', KeyRefresh: KeyRefresh+1})
                        }
                        style={{
                                borderRadius:50,
                                borderColor:'rgba(26,100,122,0.8)',
                                backgroundColor:'rgba(71,185,219,0.5)',
                                borderWidth:1,
                                margin:'3%',
                                }}
                        >
                        <Text style={styles.textTouchable} >
                            Odontología
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewTouchable} >
                        <TouchableOpacity
                        onPress={(KeyRefresh)=> this.setState({HospitalCategory: 'Covid', KeyRefresh: KeyRefresh+1})}
                        style={{
                                borderRadius:50,
                                borderColor:'rgba(44,129,49,0.8)',
                                backgroundColor:'rgba(91,225,100,0.5)',
                                borderWidth:1,
                                margin:'3%',
                                }}
                        >
                        <Text style={styles.textTouchable} >
                            Covid
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewTouchable} >
                        <TouchableOpacity
                        onPress={(KeyRefresh)=> this.setState({HospitalCategory: 'General', KeyRefresh: KeyRefresh+1})}
                        style={{
                                borderRadius:50,
                                borderColor:'rgba(131,39,39,10.8)',
                                backgroundColor:'rgba(214,67,67,0.5)',
                                borderWidth:1,
                                margin:'3%',
                                }}
                        >
                        <Text style={styles.textTouchable} >
                            General
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1,   marginTop:'8%',  alignItems:'flex-end', marginHorizontal:'1%'}} >
                    <TouchableOpacity
                    onPress={(KeyRefresh)=> this.setState({HospitalCategory: 'NoSelected', KeyRefresh: KeyRefresh+1})} //this.componentDidMount()
                    
                    >
                    <Image 
                        source={Reload}
                        style={styles.image}
                    >
                    </Image>                
                    </TouchableOpacity>
                </View> 
*/

import { StyleSheet} from 'react-native';

export const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#b466d4',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
    dark: '#b2a8b5',
    steel: '#B7B7CE',
    ghost: '#ab8ed1',
    ice: '#96D9D6'
};


export const styles = StyleSheet.create({
	pokemon: {
	  height:'100%',
	  width:'100%',
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding:90
	},
  
	pkImage:{
	  width:200,
	  height:200,
	},
	
	pkTitle: {
		flexDirection: 'row', // Arrange children in a row
		justifyContent: 'space-between', // Space items evenly
		//padding: 10,
	  },
	  textContainer: {
		flex: 1, // Each text container takes equal space
		marginHorizontal: 0,
	  },
	  name:{
		padding:10,
		textAlign: 'center',
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold'
	  },
	  dex :{
		padding:5,
		textAlign: 'center',
		color: 'black',
		fontSize: 20,
		fontStyle: 'italic',
		backgroundColor: '#C0C0C0', // Background color for the bubble
    	borderRadius: 10, // Border radius for rounded corners
		marginTop:5,
		marginHorizontal:60,
		overflow:'hidden'
	  },

	    
	itemContainer: {
		//marginHorizontal: 10,
		marginTop: 4,
		padding: 10,
		//backgroundColor: '#E0BBE4',
		fontSize: 14,
		borderRadius: 10,
		overflow: 'hidden',
		width:200
	  },
	  itemText: {
		fontSize: 18,
		marginBottom: 8,
		color:'black'
	  },
	  
  });
  


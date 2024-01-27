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
	  height:'30%',
	  width:'100%',
	  padding:90,
	  alignItems:'center',
	  flexDirection: 'row',
	  paddingHorizontal: 16,
	},
  
	pkImage:{
	  width:150,
	  height:150,
	},
	
	pkTitle: {
		flexDirection: 'row', // Arrange children in a row
		justifyContent: 'space-between', // Space items evenly
	  },
	  textContainer: {
		flex: 1, // Each text container takes equal space
		//marginHorizontal: 0,
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

	    
	statsContainer: {
		flex:0,
		height: 53,
		justifyContent: 'flex-start',
		fontSize: 14,
		paddingHorizontal: 16,
		marginBottom: 20
	  },
	types:{

		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 20
	},
	abilities:{

		fontSize: 15,
		fontWeight: '500',

	}
	
	  
  });
  


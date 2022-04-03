
import requests
import pandas as pd


class Pokedex():
    #List of endpoints needed to be called within the functions
    #Curly parenthesis is a placeholder that will be filled with an ID or name
    pokeEndpoint1 = 'https://pokeapi.co/api/v2/pokemon/{}'
    pokeEndpoint2 = 'https://pokeapi.co/api/v2/pokemon-species/{}'
    pokeEndpoint3 = 'https://pokeapi.co/api/v2/generation/{}'
    pokeEndpointAll = 'https://pokeapi.co/api/v2/pokemon/?limit=898'
    
    
    #Function to get Pokedex entry
    def getPokemon(self,dex_id):
        
        #Allows user to input Pokemon name as upper or lower case, and as an Dex number
        if not(isinstance(dex_id,int)):
            dex_id = dex_id.lower()
        
        #Due to the Json format, endpoints will have different nested information about the Pokemon, hence why multiple endpoints are needed
        r = requests.get(self.pokeEndpoint1.format(dex_id)).json()
        s = requests.get(self.pokeEndpoint2.format(dex_id)).json()
        t = requests.get(self.pokeEndpoint3.format(s['generation']['name'])).json()

        poke_types = []
        poke_abilities = []
        poke_abilities_hidden = []
    
        #Pokemon can have multiple PokeTypes
        for i in range(len(r['types'])):
            poke_types.append(r['types'][i]['type']['name'].capitalize())
        
        #Pokemon can have multiple abilities, and also have a hidden ability, this will appropriately assign the ability to the correct list
        for i in range(len(r['abilities'])):
            if r['abilities'][i]['is_hidden']:
                poke_abilities_hidden.append(r['abilities'][i]['ability']['name'].capitalize())
            else:
                poke_abilities.append(r['abilities'][i]['ability']['name'].capitalize())


        print('#{}'.format(r['id']))
        print(r['name'].capitalize())
        #Max types = 2
        if len(poke_types) < 2:
            print('Single Type {} Pokemon'.format(poke_types[0]))
        else:
            print('Dual-Type {}/{} Pokemon'.format(poke_types[0], poke_types[1]))
        #Max abilities = 3
        #Max unhidden abilities = 2
        if len(poke_abilities) < 2:
            print('Ability: 1. {}'.format(poke_abilities[0]))
        else:
            print('Abilities: 1. {}, 2. {}'.format(poke_abilities[0],poke_abilities[1]))

        #Where a Pokemon doesn't have a hidden ability, the index under the try clause will not work 
        try:
            print('Hidden Ability: {}'.format(poke_abilities_hidden[0]))
        except IndexError:
            print('No Hidden Abilities')
            
        print('Native Generation: {}'.format(t['main_region']['name'].capitalize()))

    #This method gets a list of Pokemon aand their base stats  - default to all Primary PokeTypes
    def getStats(self, priType = 'All'):
        
        pokemon_name = []
        total_base = []
        poke_types = []

        #Get all enpoints for all pokemon in database (capped at 898 - currently the amount of distinct Pokemon in Dex)
        r = requests.get(self.pokeEndpointAll).json()
        
        #for each pokemon, get the stats and types 
        for i in range(1, len(r['results'])+1):
            s = requests.get(self.pokeEndpoint1.format(i)).json()
            poke_name = s['name'].capitalize()
            pokemon_name.append(poke_name)
            stats = []
            types = []

            #Stats are displayed seperately for each stat: Attack, Defense, Speed etc
            #Stats will be appended for each pokemon, giving a list of length 6
            #total_base will then be appended with the sum of the 6 stats
            for i in range(len(s['stats'])):
                stats.append(s['stats'][i]['base_stat'])
            total_base.append(sum(stats))
            
            for i in range(len(s['types'])):
                types.append(s['types'][i]['type']['name'].capitalize())
            poke_types.append(types)
            
        d = {'name':pokemon_name, 'base stats':total_base,'types':poke_types}
        df = pd.DataFrame(data = d)
        type_split = pd.DataFrame(df['types'].to_list(), columns = ['Primary', 'Secondary'])
        df = pd.concat([df[['name','base stats']], type_split], axis=1)
        
        #If PokeType is defined, filter dataframe to Pokemon with the specified Primary PokeType
        if priType!='All':
            df_stats =  df[df['Primary'] == priType]
        else:
            df_stats = df
            
        return df_stats



import requests
import pandas as pd


class Pokedex():
    
    pokeEndpoint1 = 'https://pokeapi.co/api/v2/pokemon/{}'
    pokeEndpoint2 = 'https://pokeapi.co/api/v2/pokemon-species/{}'
    pokeEndpoint3 = 'https://pokeapi.co/api/v2/generation/{}'
    pokeEndpointAll = 'https://pokeapi.co/api/v2/pokemon/?limit=898'
    
    #get Pokemon name 
 
    def getPokemon(self,dex_id):
        
        if not(isinstance(dex_id,int)):
            dex_id = dex_id.lower()
        
        r = requests.get(self.pokeEndpoint1.format(dex_id)).json()
        s = requests.get(self.pokeEndpoint2.format(dex_id)).json()
        t = requests.get(self.pokeEndpoint3.format(s['generation']['name'])).json()
        poke_types = []
        poke_abilities = []
        poke_abilities_hidden = []
    
        for i in range(len(r['types'])):
            poke_types.append(r['types'][i]['type']['name'].capitalize())
        
        for i in range(len(r['abilities'])):
            if r['abilities'][i]['is_hidden']:
                poke_abilities_hidden.append(r['abilities'][i]['ability']['name'].capitalize())
            else:
                poke_abilities.append(r['abilities'][i]['ability']['name'].capitalize())
            
        print('#{}'.format(r['id']))
        print(r['name'].capitalize())
        #max types = 2
        if len(poke_types) < 2:
            print('Single Type {} Pokemon'.format(poke_types[0]))
        else:
            print('Dual-Type {}/{} Pokemon'.format(poke_types[0], poke_types[1]))
        #max abilities = 3
        #max unhidden abilities = 2
        if len(poke_abilities) < 2:
            print('Ability: 1. {}'.format(poke_abilities[0]))
        else:
            print('Abilities: 1. {}, 2. {}'.format(poke_abilities[0],poke_abilities[1]))
            
        try:
            print('Hidden Ability: {}'.format(poke_abilities_hidden[0]))
        except IndexError:
            print('No Hidden Abilities')
            
        print('Native Generation: {}'.format(t['main_region']['name'].capitalize()))

    
    def getStats(self, priType = 'All'):
        
        pokemon_name = []
        total_base = []
        poke_types = []
    
        r = requests.get(self.pokeEndpointAll).json()
        
        for i in range(1, len(r['results'])+1):
            s = requests.get(self.pokeEndpoint1.format(i)).json()
            poke_name = s['name'].capitalize()
            pokemon_name.append(poke_name)
            stats = []
            types = []
        
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
        
        if priType!='All':
            df_stats =  df[df['Primary'] == priType]
        else:
            df_stats = df
            
        return df_stats


import { Episode, Character } from "./types.ts";

export const getCharacter = async (id: string): Promise<Character> => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (response.status !== 200) {
        throw new Error(`Character no encontrado`);
    }
  
    const character: Character = await response.json();
  
    const episodes = await Promise.all(character.episode.map(async (episode) => {
        const response = await fetch(episode);
        if (response.status !== 200) {
            throw new Error(`No se encuentra el episodio`);
        }
        const episodeData = await response.json();
        return{
            id: episodeData.id,
            name: episodeData.name,
            characters: []
        }
    })
    );

    return {
        id: character.id,
        name: character.name,
        episode: episodes
    }
};
    
export default getCharacter;

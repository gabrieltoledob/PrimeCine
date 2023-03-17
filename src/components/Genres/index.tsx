import React from 'react';

import { Container, Name, ButtonName } from './styles';

function Genres({data}) {
  return(
        <ButtonName activeOpacity={0.5} >
          <Name> {data.name} </Name>
        </ButtonName>
  )
}

export default Genres;
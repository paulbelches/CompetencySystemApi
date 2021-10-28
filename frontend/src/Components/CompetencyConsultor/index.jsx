import React, {useState} from 'react';
import styles from './competencyConsultor.module.css';
import Button from '@material-ui/core/Button';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';

const CompetencyConsultor = (props) => {
    const [selectedCompetency, setSelectedCompetency] = useState("")

    const method = async () => {
      if (
        selectedCompetency != "" 
      ){
        const array = props.competencys;
        const obj = array.find( ({ name }) => name === selectedCompetency )
        const result = await props.competencysMethod(obj.id)
        const dispositions = props.dispositions.filter(
          (disposition) => result.dispositions.includes(disposition.id) 
        ).map(
          (disposition) => {return disposition.name}
        )
        const knowledgeElements = props.knowledgeElements.filter(
          (knowledgeElement) => result.knowledgeElements.includes(knowledgeElement.id) 
        ).map(
          (knowledgeElement) => {return knowledgeElement.name}
        )
        return {
          "title": result.name, 
          "text": result.statement, 
          "knowledgeElements": knowledgeElements , 
          "dispositions": dispositions
        }
      } else {
        alert("Seleccione un campo")
      }
    }

  
    return (      
      <div className={styles.wrapper}>
        <p className={styles.title}>Consulta de competencias</p>
        <div>
          <ComboBox
              value = {selectedCompetency}
              options = {props.competencys ? props.competencys.map((competencys) => {return competencys.name } ) : []}
              method = {(value) => setSelectedCompetency(value)}
              title = {"Seleccione una competencia"}
            /> 
          <br/>
          <br/>
          <AlertButton
            text={"Consultar"}
            method={(value) => method(value)}
          />
          </div>
      </div>
    );
}

export default CompetencyConsultor;
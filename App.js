import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: '',
      calculationText: ''
    }   
    this.operations = ['DEL', '+', '-', '*', '/'];
  }

  calculateResult() {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text) 
    })
  }

  validate() {
    const text = this.state.resultText;
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
        return true
  }

  buttonPressed(text) {
    if(text == '='){
      return this.validate() && this.calculateResult(this.state.resultText)
    }

    this.setState({
      resultText: this.state.resultText+text
    })
  }

  operate(operation) {
    switch(operation) {
      case 'DEL':
       let text = this.state.resultText.split('')
       text.pop()
       this.setState({
         resultText: text.join('')
       });
       break;
      case '+':
      case '-':
      case '*':
      case '/':
         const lastChar = this.state.resultText.split('').pop();

         if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.resultText == '') {
          return this.setState({
          resultText: ''
       })
    }
      return this.setState({
        resultText: this.state.resultText + operation
      })
    }
  }

  render() {
    let rows = [];
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
      for(let i=0; i<4; i++) {
        let row = [];
          for(let j=0; j<3; j++) {
            row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
              <Text style={styles.btnText}>{nums[i][j]}</Text>
            </TouchableOpacity>)
          }
        rows.push(<View key={i} style={styles.row}>{row}</View>)
      }


    let ops = [];
    for(let i=0; i<5; i++) {
      ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.btn}>
        <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculator}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
             {ops}
          </View>  
        </View>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 35,
    color: 'black'
  },
  calculationText: {
    fontSize: 50,
    color: 'black'
  },
  btn: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  },
  white: {
    color: 'white'
  },
  result:{
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 70,
  },
  calculator: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end',
   marginRight: 20
  },
  buttons: {
    flex: 7,
    flexDirection: 'row' 
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around'
  }
});

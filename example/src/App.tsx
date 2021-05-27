import React from "react";
import { Row, Col } from "antd";
import "./App.css";
import { LRX, LRXDocument, p } from "typescript-react-test";

let akvaruim = `Аквариум - Город золотой

[1 куплет]
     Am     E7  Am               E7  Am
Под небом #голубым~+5 есть город #золотой~1+5         [00:29.95-00:37.48]
       Dm        Dm6       Faug      E7
С прозрачными воротами~+5 и яркою звездой.~1+5      [00:37.48-00:45.12]
     Am E7      Am            E7     Am
А в городе том сад,~+5 все травы да цветы,~2+5      [00:45.12-00:52.77]
   Dm         Dm6      E7          Am
Гуляют там животные~+5 невиданной красы.~2+5        [00:52.77-00:59.64]

[Припев]
   A7              Dm
Одно – как желтый огнегривый лев,~3+5               [01:00.55-01:04.19]
    G7           C
Другое – вол исполненный очей.~4+5                  [01:04.19-01:08.03]
   Dm                  F7   E7
С ними золотой орел небесный,~5+5                   [01:08.03-01:11.66]
 Dm                        F7 E7 Am
Чей так светел взор незабываемый.~6+5               [01:12.16-01:15.66]

[2 куплет]
   Am     E7  Am               E7  Am
А в небе голубом~+5 горит одна звезда~7+5             [01:45.82-01:53.30]
       Dm        Dm6       Faug      E7
Она твоя, о ангел мой,~+5 она твоя всегда~7+5         [01:53.30-02:00.67]
    Am     E7  Am               E7  Am
Кто любит тот любим,~+5 кто светел – тот и свят~8+5   [02:00.67-02:08.36]
   Dm         Dm6      E7          Am
Пускай ведет звезда тебя~+5 дорогой в дивный сад~8+5  [02:08.36-02:13.36]

[Припев]
   A7              Dm
Тебя там встретит огнегривый лев,~3+5               [02:16.11-02:20.00]
    G7           C
Другое – вол исполненный очей.~4+5                  [02:20.00-02:23.74]
   Dm                  F7   E7
С ними золотой орел небесный,~5+5                   [02:23.74-02:27.49]
 Dm                        F7 E7 Am
Чей так светел взор незабываемый.~6+5               [02:27.49-02:32.49]

===

~1 Комментарий к строке №1
~1 Комментарий к строке №1
~1 Комментарий к строке №1
~1 Комментарий к строке №1
~1 Комментарий к строке №1
~1 Комментарий к строке №1
~1 Комментарий к строке №1
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2
~2 Комментарий к строке №2

`;
let lrxDoc = p.parse(akvaruim, {}) as LRXDocument;

function App() {
  return (
    <div className="App">
      <Row className="wrapper">
        <Col md={8}>
          <LRX doc={lrxDoc} audioUrl="akvarium.mp3" />
        </Col>
      </Row>
    </div>
  );
}

export default App;

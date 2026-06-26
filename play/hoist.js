/* global global, console, URL, globalThis, process */

import {
  hoistTrivia,
  printPrettyCSTML as printPrettyCSTMLStream,
} from '@bablr/agast-helpers/stream';

import { printTag } from '@bablr/agast-helpers/tree';
import { CloseNodeTag, OpenNodeTag } from '@bablr/agast-helpers/symbols';
import { parseTag, parseTagType } from '@bablr/agast-helpers/builders';
global.printTag = printTag;

Error.stackTraceLimit = 20;

let enhancers = {};

let log = (val) => {
  console.log('>>> ' + printTag(val));
  return val;
};

// prettier-ignore
let tags = function* () {
  {
  // yield log(t`<_>`);
  // yield log(t`  _$:`);
  // yield log(t`  <_Expression>`);
  // yield log(t`    _$:`);
  // yield log(t`    <String>`);
  // yield log(t`      openToken*:`);
  // yield log(t`      <* '"' />`);
  // yield log(t`      content$:`);
  // yield log(t`      <*StringContent />`);
  // yield log(t`      closeToken*:`);
  // yield log(t`      <* '"' />`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<_Top>`);
  // yield log(t`  _$:`);
  // yield log(t`  <Alternative>`);
  // yield log(t`    elements[]+$:`);
  // yield log(t`    <Element>`);
  // yield log(t`    </>`);
  // yield log(t`    ^^^`);
  // yield log(t`    <Quantifier { min: 1, max: +Infinity }>`);
  // yield log(t`      element+$:`);
  // yield log(t`      <//>`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<_>`);
  // yield log(t`  #:`);
  // yield log(t`  :Space:`);
  // yield log(t`  <_Blank>`);
  // yield log(t`    _$:`);
  // yield log(t`    <*Space ' ' />`);
  // yield log(t`  </>`);
  // yield log(t`  _$:`);
  // yield log(t`  <_Expression>`);
  // yield log(t`    _$:`);
  // yield log(t`    <String>`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`  #:`);
  // yield log(t`  :Space:`);
  // yield log(t`  <_Blank>`);
  // yield log(t`    _$:`);
  // yield log(t`    <*Space ' ' />`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<ExpressionStatement>`);
  // yield log(t`  expression+$:`);
  // yield log(t`  <_Trivia_>`);
  // yield log(t`    _:`);
  // yield log(t`    <_Expression>`);
  // yield log(t`      _:`);
  // yield log(t`      <Identifier>`);
  // yield log(t`        value*:`);
  // yield log(t`        <_Trivia_>`);
  // yield log(t`          _:`);
  // yield log(t`          <*Literal 'a' />`);
  // yield log(t`        </>`);
  // yield log(t`      </>`);
  // yield log(t`    </>`);
  // yield log(t`    #:`);
  // yield log(t`    :Space:`);
  // yield log(t`    <*Space ' ' />`);
  // yield log(t`  </>`);
  // yield log(t`  ^^^`);
  // yield log(t`  <_Expression>`);
  // yield log(t`    _:`);
  // yield log(t`    <Thing>`);
  // yield log(t`      ref:`);
  // yield log(t`      <//>`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<__>`);
  // yield log(t`  .[]$:`);
  // yield log(t`  <_Tag>`);
  // yield log(t`    _:`);
  // yield log(t`    <DoctypeTag>`);
  // yield log(t`      closeToken*:`);
  // yield log(t`      <* '>' />`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`  #:`);
  // yield log(t`  :Space:`);
  // yield log(t`  <_Blank />`);
  // yield log(t`  .[]$:`);
  // yield log(t`  <_Tag>`);
  // yield log(t`    _:`);
  // yield log(t`    <CloseNodeTag>`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`  #:`);
  // yield log(t`  :Space:`);
  // yield log(t`  <_Blank />`);
  // yield log(t`</>`);

  // yield log(t`<ExpressionStatement>`);
  // yield log(t`  <MemberExpression />`);
  // yield log(t`  ^^^`);
  // yield log(t`  <AssignmentExpression>`);
  // yield log(t`    left+$:`);
  // yield log(t`    <//>`);
  // yield log(t`    #:`);
  // yield log(t`    <*Sporce ' ' />`);
  // yield log(t`    right+$:`);
  // yield log(t`    <_Trivia_>`);
  // yield log(t`      #:`);
  // yield log(t`      <*Space ' ' />`);
  // yield log(t`      _:`);
  // yield log(t`      <Boolean>`);
  // yield log(t`        sigilToken*:`);
  // yield log(t`        <*Keyword 'false' />`);
  // yield log(t`      </>`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<ExpressionStatement>`);
  // yield log(t`  expression+$:`);
  // yield log(t`  <_Trivia_>`);
  // yield log(t`    _:`);
  // yield log(t`    <Identifier 'a' />`);
  // yield log(t`    #:`);
  // yield log(t`    <*Space ' ' />`);
  // yield log(t`  </>`);
  // yield log(t`  ^^^`);
  // yield log(t`  <TernaryExpression>`);
  // yield log(t`    test+$:`);
  // yield log(t`    <//>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<ExpressionStatement>`)
  // yield log(t`  expression+$:`)
  // yield log(t`  <_Trivia_>`)
  // yield log(t`    _:`)
  // yield log(t`    <*Literal 'a' />`)
  // yield log(t`    #:`)
  // yield log(t`    :Space:`)
  // yield log(t`    <*Space ' ' />`)
  // yield log(t`  </>`)
  // yield log(t`  ^^^`)
  // yield log(t`  <Outer>`)
  // yield log(t`    a+$:`)
  // yield log(t`    <//>`)
  // yield log(t`  </>`)
  // yield log(t`</>`)

  // yield log(t`<__>`)
  // yield log(t`  #:`)
  // yield log(t`  <*Space ' ' />`)
  // yield log(t`  .[]$:`)
  // yield log(t`  <Tag />`)
  // yield log(t`  #:`)
  // yield log(t`  <*Space ' ' />`)
  // yield log(t`</>`)

  // yield log(t`<__>`);
  // yield log(t`  .[]$:`);
  // yield log(t`  <_Tag>`);
  // yield log(t`    _:`);
  // yield log(t`    <OpenNodeTag { selfClosing: true }>`);
  // yield log(t`      #:`);
  // yield log(t`      :Space:`);
  // yield log(t`      <_Blank>`);
  // yield log(t`        _:`);
  // yield log(t`        <*Space ' ' />`);
  // yield log(t`      </>`);
  // yield log(t`      literalValue$:`);
  // yield log(t`      null`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);


  // yield log(t`<_Trivia_>`);
  // yield log(t`  _:`);
  // yield log(t`  <_Expression/>`);
  // yield log(t`    #:`);
  // yield log(t`    <_Blank>`);
  // yield log(t`      ' '`);
  // yield log(t`    </>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);
  }

  // yield log(t`<$_>`);
  // yield log(t`  _:`);
  // yield log(t`  <$Program>`);
  // yield log(t`  </>`);
  // yield log(t`  #:`);
  // yield log(t`  <$Trivia>`);
  // yield log(t`  </>`);
  // yield log(t`</>`);

  // yield log(t`<$_>`)
  // yield log(t`  _:`)
  // yield log(t`  <$_Expression>`)
  // yield log(t`    _:`)
  // yield log(t`    <$Array>`)
  // yield log(t`      openToken*:`)
  // yield log(t`      <* '[' />`)
  // yield log(t`      #separatorTokens:`)
  // yield log(t`      <* ',' />`)
  // yield log(t`      #:`)
  // yield log(t`      :Space:`)
  // yield log(t`      <$_Blank>`)
  // yield log(t`        _:`)
  // yield log(t`        <*Space ' ' />`)
  // yield log(t`      </>`)
  // yield log(t`      closeToken*:`)
  // yield log(t`      <* ']' />`)
  // yield log(t`    </>`)
  // yield log(t`  </>`)
  // yield log(t`</>`)


  yield log(t`<$_>`);
  yield log(t`  _:`);
  yield log(t`  <$Program>`);
  yield log(t`    body[]$:`);
  yield log(t`    <$_Statement>`);
  yield log(t`      _:`);
  yield log(t`      <$FunctionDeclaration>`);
  yield log(t`        sigilToken*:`);
  yield log(t`        <*Keyword>`);
  yield log(t`          'function'`);
  yield log(t`        </>`);
  yield log(t`        #:`);
  yield log(t`        <* ' ' />`);
  yield log(t`        name$:`);
  yield log(t`        <$Identifier>`);
  yield log(t`          value*:`);
  yield log(t`          <*Literal 'streamParse' />`);
  yield log(t`        </>`);
  yield log(t`        openParamsToken*:`);
  yield log(t`        <* '(' />`);
  yield log(t`        params[]+$:`);
  yield log(t`        params[]+$:`);
  yield log(t`        <$_CapturePattern>`);
  yield log(t`          _:`);
  yield log(t`          <$Identifier>`);
  yield log(t`            value*:`);
  yield log(t`            <*Literal 'chrs' />`);
  yield log(t`          </>`);
  yield log(t`        </>`);
  yield log(t`        closeParamsToken*:`);
  yield log(t`        <* ')' />`);
  yield log(t`        #:`);
  yield log(t`        <* ' ' />`);
  yield log(t`        body$:`);
  yield log(t`        <$Block>`);
  yield log(t`          openToken*:`);
  yield log(t`          <* '{' />`);
  yield log(t`          closeToken*:`);
  yield log(t`          <* '}' />`);
  yield log(t`        </>`);
  yield log(t`      </>`);
  yield log(t`    </>`);
  yield log(t`  </>`);
  yield log(t`  #:`);
  yield log(t`  <$Trivia>`);
  yield log(t`    .:`);
  yield log(t`    :Space:`);
  yield log(t`    <$_Blank>`);
  yield log(t`      _:`);
  yield log(t`      <*Newline '\n' />`);
  yield log(t`    </>`);
  yield log(t`  </>`);
  yield log(t`</>`);
};

let indent = 0;
for (let tag of hoistTrivia(tags())) {
  let tagType = parseTagType(tag);
  if (tagType === CloseNodeTag) indent--;
  console.log('  '.repeat(indent) + printTag(tag));
  if (tagType === OpenNodeTag && !parseTag(tag).value.selfClosing) indent++;
}

// console.log();

// console.log(printPrettyCSTMLStream(tags()));

import defaultBinders from '../defaultbinders';
import lookForBinder from '../lookforbinder';
import parserBrackers from '../parserbrackets';
import Class from '../class';
import * as binders from '../binders';
import * as universalMethods from './_universalmethods';
import assign from '../_helpers/assign';

export default assign({
    Class,
    defaultBinders,
    lookForBinder,
    binders,
    parserBrackers
}, universalMethods);
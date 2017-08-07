interface KnockoutSubscribableFunctions {
  extend( source );
  getSubscriptionsCount(): number;
  notifySubscribers( valueToWrite, topic?: string );
  subscribe( callback: ( newValue: any ) => void , target?: any, topic?: string ): KnockoutSubscription;
}

interface KnockoutObservableFunctions<T> extends KnockoutSubscribableFunctions {
  peek(): T;
  valueHasMutated(): void;
  valueWillMutate(): void;
}

interface KnockoutObservableArrayFunctions<T> extends KnockoutObservableFunctions<T> {
  // General Array functions
  indexOf( searchElement:T, fromIndex?: number ): number;
  slice( start: number, end?: number ): T[];
  splice( start: number ): T[];
  splice( start: number, deleteCount: number, ...items: T[] ): T[];

  pop(): T;
  push( ...items: T[] ): number;
  shift(): T;
  unshift( ...items: T[] ): number;
  reverse(): T[];
  sort( compareFn?: ( a: T, b: T ) => number ): T[];

  // Ko specific
  replace( oldItem: T, newItem: T ): void;

  remove( item:T ): T[];
  removeAll( items: T[] ): T[];
  removeAll(): T[];

  destroy( item: T ): void;
  destroy( predicate:(item:T)=>boolean ): void;
  destroyAll( items: T[] ): void;
  destroyAll(): void;
}


interface KnockoutComputedFunctions<T> extends KnockoutSubscribableFunctions {
  getDependenciesCount(): number;
  isActive(): boolean;
  peek(): T;
}

interface KnockoutObservableBase<T> extends KnockoutObservableFunctions<T> {
}

interface KnockoutSubscription {
  dispose(): void;
}

interface KnockoutObservable<T> extends KnockoutObservableBase<T>{
  (): T;
  ( value: T ): void;
}

// might be possible to have an "alias" for backwards compatibility, but appears buggy in 0.9.alpha
//interface KnockoutObservableBool extends KnockoutObservable<boolean>{
//  (): boolean;
//  ( value?: boolean ): KnockoutObservable<boolean>;
//}

interface KnockoutObservableArray<T> extends KnockoutObservableArrayFunctions<T> {
  (): T[];
  ( value: T[] ): void;
}

interface KnockoutComputed<T> extends KnockoutComputedFunctions<T> {
  (): T;
  ( value: any ): void;

  hasWriteFunction: bool;
}

interface KnockoutBindingContext {
  $parent: any;
  $parents: any[];
  $root: any;
  $data: any;
  $index?: number;
  $parentContext?: KnockoutBindingContext;

  ko: KnockoutStatic;
  extend( any ): any;
  createChildContext( any ): any;
}

interface KnockoutBindingHandler {
  init? ( element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext ): void;
  update? ( element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext ): void;
}

interface KnockoutBindingHandlers {
  // Controlling text and appearance
  visible: KnockoutBindingHandler;
  text: KnockoutBindingHandler;
  html: KnockoutBindingHandler;
  css: KnockoutBindingHandler;
  style: KnockoutBindingHandler;
  attr: KnockoutBindingHandler;

  // Control Flow
  foreach: KnockoutBindingHandler;
  if: KnockoutBindingHandler;
  ifnot: KnockoutBindingHandler;
  with: KnockoutBindingHandler;

  // Working with form fields
  click: KnockoutBindingHandler;
  event: KnockoutBindingHandler;
  submit: KnockoutBindingHandler;
  enable: KnockoutBindingHandler;
  disable: KnockoutBindingHandler;
  value: KnockoutBindingHandler;
  hasfocus: KnockoutBindingHandler;
  checked: KnockoutBindingHandler;
  options: KnockoutBindingHandler;
  selectedOptions: KnockoutBindingHandler;
  uniqueName: KnockoutBindingHandler;

  // Rendering templates
  template: KnockoutBindingHandler;
}

interface KnockoutMemoization {
  memoize( callback: Function ): string;
  unmemoize( memoId: string, callbackParams: any ): void;
  unmemoizeDomNodeAndDescendants( domNode: any, extraCallbackParamsArray?: any[] );
  parseMemoText( memoText: string ): string;
}

interface KnockoutVirtualElements {
  allowedBindings; // {foreach:boolean, if:boolean, ifnot:boolean, template:boolean, text:boolean, with: boolean}
  emptyNode( node ): void;
  firstChild( node ): any;
  insertAfter( containerNode, nodeToInsert, insertAfterNode ): void;
  nextSibling( node ): any;
  prepend( containerNode, nodeToPrepend ): void;
  setDomNodeChildren( node, childNodes: any[] ): void;
}

interface KnockoutExtenders {
  throttle( target: any, timeout: number ): KnockoutComputed;
  notify<T>( target: T, notifyWhen: string ): T;
}

interface KnockoutUtils {

  fieldsIncludedWithJsonPost: any[];

  arrayForEach<T>( array: T[], action: ( item: T ) => void ): void;
  arrayIndexOf<T>( array: T[], item: T ): number;
  arrayFirst<T>( array: T[], predicate: ( item: T ) => bool, predicateOwner?: any ): any;
  arrayRemoveItem<T>( array: T[], itemToRemove: T ): void;
  arrayGetDistinctValues<T>( array: T[] ): T[];
  arrayMap<T, U>( array: T[], mapping: ( item: T ) => U ): U[];
  arrayFilter<T>( array: T[], predicate: ( item: T ) => boolean ): T[];
  arrayPushAll<T>( array: T[], valuesToPush: T[] ): T[];

  extend<T>( target: T, source ): T;

  emptyDomNode( domNode ): void;
  moveCleanedNodesToContainerElement( nodes: any[] ): HTMLDivElement;
  cloneNodes( nodesArray: any[], shouldCleanNodes: boolean ): any[];
  setDomNodeChildren( domNode: any, childNodes?: any[] ): void;
  replaceDomNodes( nodeToReplaceOrNodeArray: any, newNodesArray: any[] ): void;
  setOptionNodeSelectionState( optionNode: any, isSelected: bool ): void;
  stringTrim( str: string ): string;
  stringTokenize( str: string, delimiter: string ): string;
  stringStartsWith( str: string, startsWith: string ): string;
  domNodeIsContainedBy( node: any, containedByNode: any ): boolean;
  domNodeIsAttachedToDocument( node: any ): boolean;
  tagNameLower( element: any ): string;
  registerEventHandler( element: any, eventType: any, handler: Function ): void;
  triggerEvent( element: any, eventType: string ): void;
  unwrapObservable( value: any ): any;
  peekObservable( value: any ): any;
  toggleDomNodeCssClass( node: any, className: string, shouldHaveClass: boolean ): void;
  setTextContent( element: any, textContent: string ): void;
  setElementName( element: any, name: string ): void;
  forceRefresh( node: any ): void;
  ensureSelectElementIsRenderedCorrectly( selectElement: any ): void;
  range<T>( min: T, max: T ): T[];
  makeArray( arrayLikeObject: any ): any[];
  getFormFields( form: any, fieldName: string ): any[];
  parseJson( jsonString: string ): any;
  stringifyJson( data: any, replacer: Function, space: string ): string;
  postJson( urlOrForm: any, data: any, options: any ): void;

  ieVersion: number;
  isIe6: bool;
  isIe7: bool;

  domData: {
    get( node, key ): any;
    set( node, key, value ): void;
    getAll( node, createIfNotFound: boolean ): any;
    clear( node ): boolean
  };
  domNodeDisposal: {
    addDisposeCallback( node, callback: Function ): void;
    cleanNode<T>( node: T ): T;
    removeDisposeCallback( node, callback: Function ): void;
    removeNode( node ): void;
  };
}

interface KnockoutComputedDefine {
  read(): any;
  write( any );
}

interface KnockoutComputedStaticfn{

}
interface KnockoutSubscribableStaticfn{

}
interface KnockoutObservableStaticfn{

}
interface KnockoutObservableArrayStaticfn{

}
/*
  Static members of ko.computed
*/
interface KnockoutComputedStatic {
  fn: KnockoutComputedStaticfn;

  <T>(): KnockoutComputed<T>;
  <T>( evaluatorFunction: Function, context?: any, options?: any ): KnockoutComputed<T>;
  <T>( def: KnockoutComputedDefine ): KnockoutComputed<T>;
  <T>( options?: any ): KnockoutComputed<T>;
}

interface KnockoutSubscribable extends KnockoutSubscribableFunctions{

}

interface KnockoutSubscribableStatic {
  fn: KnockoutSubscribableStaticfn;

  new (): KnockoutSubscribable;
}

interface KnockoutObservableStatic{
  fn: KnockoutObservableStaticfn;

  <T>( value?: T ): KnockoutObservable<T>;
}

interface KnockoutObservableArrayStatic {
  fn: KnockoutObservableArrayStaticfn;

  <T>( value?: T[] ): KnockoutObservableArray<T>;
}
/*
  Static members of Knockout (those on ko itself)
*/
interface KnockoutStatic {
  utils: KnockoutUtils;
  memoization: KnockoutMemoization;
  bindingHandlers: KnockoutBindingHandlers;
  virtualElements: KnockoutVirtualElements;
  extenders: KnockoutExtenders;

  applyBindings( viewModel: any, rootNode?: any ): void;
  applyBindingsToDescendants( viewModel: any, rootNode: any ): void;
  applyBindingsToNode( node: Element, options: any, viewModel: any ): void;

  subscribable: KnockoutSubscribableStatic;

  observable: KnockoutObservableStatic;
  //observable<T>( value?: T ): KnockoutObservable;
  computed: KnockoutComputedStatic;
  observableArray: KnockoutObservableArrayStatic;
  //observableArray<T>( value?: T[] ): KnockoutObservableArray;

  isWriteableObservable(item:any): boolean;

  version: string;

  contextFor( node: Element ): any;
  isSubscribable( instance: any ): boolean;
  toJSON( viewModel: any, replacer?: ( key: string, value: any ) => any, space?: any ): string;
  toJS( viewModel: any ): any;
  isObservable( instance: any ): boolean;
  isComputed( instance: any ): boolean;
  dataFor( node: Element ): any;

  cleanNode( node: Element ): Element;
  removeNode( node: Element ): void;

  bindingProvider: any;
}

declare var ko: KnockoutStatic;
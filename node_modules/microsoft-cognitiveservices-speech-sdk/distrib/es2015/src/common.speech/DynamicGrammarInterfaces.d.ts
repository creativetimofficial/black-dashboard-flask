/**
 * Top level grammar node
 */
export interface IDynamicGrammar {
    ReferenceGrammars?: string[];
    Groups?: IDynamicGrammarGroup[];
}
/**
 * Group of Dynamic Grammar items of a common type.
 */
export interface IDynamicGrammarGroup {
    Type: string;
    Name?: string;
    SubstringMatch?: string;
    Items: IDynamicGrammarPeople[] | IDynamicGrammarGeneric[];
}
export interface IDynamicGrammarPeople {
    Name: string;
    First?: string;
    Middle?: string;
    Last?: string;
    Synonyms?: string[];
    Weight?: number;
}
/**
 * Generic phrase based dynamic grammars
 */
export interface IDynamicGrammarGeneric {
    Text: string;
    Synonyms?: string[];
    Weight?: number;
}

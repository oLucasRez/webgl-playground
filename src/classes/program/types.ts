export type ShaderVariableType =
  | 'float'
  | 'vec2'
  | 'vec3'
  | 'vec4'
  | 'mat2'
  | 'mat3'
  | 'mat4';

export type Attributes = Record<string, ShaderVariableType>;

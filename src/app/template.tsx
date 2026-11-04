import { SceneStage } from "@/components/scene/scene-stage";

/**
 * Un `template` (contrairement au `layout`) est recréé à chaque navigation :
 * c'est ce qui permet de rejouer l'entrée de scène à chaque nouvelle pièce.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <SceneStage>{children}</SceneStage>;
}

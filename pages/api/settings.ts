import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

const DEFAULT_SETTINGS = {
  id: 'about',
  // About page
  aboutTitle: 'Hikayemiz',
  aboutSubtitle: 'Erhan Usta\'nın Lezzet Yolculuğu',
  aboutDescription: '2010 yılında İzmir Göztepe\'de küçük bir dükkanda başlayan serüvenimiz, Erhan Usta\'nın tutkusuyla bugün şehrin en sevilen pizza durağı haline geldi. Sırrımız çok basit: Geleneksel yöntemlere sadık kalmak ve asla kaliteden ödün vermemek.',
  feature1Title: 'Taş Fırın Lezzeti',
  feature1Desc: 'Pizzalarımız, meşe odunuyla ısıtılan özel taş fırınımızda, 400 derecede pişer.',
  feature2Title: '72 Saat Mayalanma',
  feature2Desc: 'Hamurumuz özel un karışımıyla hazırlanır ve sindirimi kolaylaştırmak için en az 72 saat soğuk mayalanır.',
  feature3Title: '%100 Yerli ve Doğal',
  feature3Desc: 'Soslarımızda Çanakkale domatesleri, üzerlerinde ise yerel üreticilerden aldığımız taze peynirler kullanılır.',
  aboutImage1: null,
  aboutImage2: null,
  // Contact page
  contactAddress: 'Mithatpaşa Caddesi No: 35, Göztepe, Konak / İzmir',
  contactPhone: '+90 232 555 35 35',
  contactPhoneHours: 'Hergün 11:00 - 23:00 arası',
  contactEmail: 'info@iolopizza.com',
  contactInstagram: null,
  contactTwitter: null,
  contactFacebook: null,
  contactMapUrl: null,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - fetch site settings (public)
  if (req.method === 'GET') {
    try {
      let settings = await prisma.siteSettings.findUnique({
        where: { id: 'about' },
      });

      // If no settings exist, return defaults
      if (!settings) {
        return res.status(200).json(DEFAULT_SETTINGS);
      }

      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(200).json(DEFAULT_SETTINGS);
    }
  }

  // PUT - update site settings (requires auth)
  if (req.method === 'PUT') {
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const {
        // About fields
        aboutTitle,
        aboutSubtitle,
        aboutDescription,
        feature1Title,
        feature1Desc,
        feature2Title,
        feature2Desc,
        feature3Title,
        feature3Desc,
        aboutImage1,
        aboutImage2,
        // Contact fields
        contactAddress,
        contactPhone,
        contactPhoneHours,
        contactEmail,
        contactInstagram,
        contactTwitter,
        contactFacebook,
        contactMapUrl,
      } = req.body;

      const settings = await prisma.siteSettings.upsert({
        where: { id: 'about' },
        update: {
          aboutTitle,
          aboutSubtitle,
          aboutDescription,
          feature1Title,
          feature1Desc,
          feature2Title,
          feature2Desc,
          feature3Title,
          feature3Desc,
          aboutImage1,
          aboutImage2,
          contactAddress,
          contactPhone,
          contactPhoneHours,
          contactEmail,
          contactInstagram,
          contactTwitter,
          contactFacebook,
          contactMapUrl,
        },
        create: {
          id: 'about',
          aboutTitle,
          aboutSubtitle,
          aboutDescription,
          feature1Title,
          feature1Desc,
          feature2Title,
          feature2Desc,
          feature3Title,
          feature3Desc,
          aboutImage1,
          aboutImage2,
          contactAddress,
          contactPhone,
          contactPhoneHours,
          contactEmail,
          contactInstagram,
          contactTwitter,
          contactFacebook,
          contactMapUrl,
        },
      });

      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
